import "./App.css";
import browser from "webextension-polyfill";
import { useEffect, useRef, useState } from "react";

function App() {
  const [query, setQuery] = useState<string>("");
  const [tabs, setTabs] = useState<{ id?: number; title?: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const listRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [selected, setSelected] = useState<number>(0);

  const updateQuery = async (text: string) => {
    setQuery(text);
    const filteredTabs = await getWindowTabs(text);
    if (filteredTabs.length !== tabs.length) {
      setSelected(0);
    }
    setTabs(filteredTabs.map((t) => ({ id: t.id, title: t.title })));
  };

  const getWindowTabs = async (text: string) => {
    const windowTabs = await browser.tabs.query({ currentWindow: true });
    return windowTabs.filter((t) =>
      t.title?.toLowerCase().includes(text.toLowerCase())
    );
  };

  const handleKeyDown = (key: string) => {
    if (key === "ArrowDown") {
      if (selected === tabs.length - 1) {
        return;
      }
      setSelected(selected + 1);
      listRef.current.scrollBy({ top: 30 });
    }
    if (key === "ArrowUp") {
      if (selected === 0) {
        return;
      }
      setSelected(selected - 1);
      listRef.current.scrollBy({ top: -30 });
    }
    if (key === "Enter") {
      const id = tabs[selected].id;
      if (!id) {
        return;
      }
      browser.tabs.update(id, { active: true });
    }
  };

  const initTabs = async () => {
    const tabs = await getWindowTabs("");
    setTabs(tabs);
  };

  useEffect(() => {
    initTabs();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div>
      <div className="input-container">
        <input
          ref={inputRef}
          autoFocus
          className="input"
          type={"text"}
          value={query}
          onKeyDown={(e) => handleKeyDown(e.key)}
          onChange={(val) => updateQuery(val.currentTarget.value)}
        />
        <div ref={listRef} className="card">
          <div className="list">
            {tabs.map((t, i) => (
              <div className={i === selected ? "selected-item" : "item"}>
                {t.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
