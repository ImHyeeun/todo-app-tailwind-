import { useState, useEffect, useRef } from "react";

export default function Todo({
  id, name, completed, deleteTask, toggleTaskCompleted, editTask
}) {
  // 편집상태 관리
  const [isEditing, setIsEditing] = useState(false);
  // 할일의 새 이름(수정)
  const [newName, setNewName] = useState("");
  // useRef Hook: 엘리먼트에 접근할 수 있다
  const inputEl = useRef(null);

  // 폼 제출처리
  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);

    // 수정 완료후 뷰 템플릿으로 이동한다
    setIsEditing(false);
    // 수정버튼을 다시 비활성화상태로 만든다
    setNewName("");
  }

  // 비동기적으로 작동한다
  useEffect(() => {
    if (isEditing) {
      // inputEl.current: input 엘리먼트
      inputEl.current.focus();
    }
  })

  // 뷰 템플릿
  const viewTemplate = (
    <>
      <div className="flex mb-2">
        <label>
          <input
            type="checkbox"
            className="peer hidden"
            checked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <span className="text-xl peer-checked:line-through">
            {name}
          </span>
        </label>
      </div>

      <div className="flex flex-nowrap gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="border-2 font-semibold px-2 py-1 w-full mb-2"
        >
          수정
        </button>
        <button
          className="px-2 py-1 w-full mb-2 bg-red-500 text-white font-semibold"
          onClick={() => deleteTask(id)}
        >
          삭제
        </button>
      </div>
  </>
  )

  // 편집 템플릿(폼)
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        value={newName || name}
        onChange={(e) => setNewName(e.target.value)}
        ref={inputEl}
      />

      <div className="flex flex-nowrap gap-1">
        <button
          type="button"
          className="border-2 font-semibold w-1/2 p-1 border"
          onClick={() => setIsEditing(false)}
        >
          취소
        </button>
        <button
          type="submit"
          className="w-1/2 p-1 disabled:opacity-50 bg-blue-500 text-white font-semibold"
          disabled={!newName.trim()}
        >
          저장
        </button>
      </div>
    </form>
  )

  return (
    <li className="mb-4">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}