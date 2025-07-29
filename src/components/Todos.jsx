import { useState, useEffect } from "react";
import { Plus, X, CheckCircle2 } from "lucide-react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
 

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if(input.trim()){
    setTodos((todos) => {
      return todos.concat({
        text: input,
        id: Date.now(),
        completed : false
      });
    });
    setInput("");
}
    
  };

 const remove = (id) => {
  setTodos((todos) => {
    return todos.filter((t) => t.id !== id);
  });
};


const complete = (id) => {
  setTodos((todos) =>
    todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  );
};

 

  return (
    <div className="min-h-screen flex items-center justify-center h-screen bg-slate-700">
        <div className="w-full max-w-md">
  
         <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Todo List</h1>
          <p className="text-slate-300">Stay organized and productive</p>
        </div>
       
       <div className="bg-white/10 rounded-2xl overflow-hidden border border-white shadow-2xl">
     <div className="p-6 border-b border-white/10">
     <div className="flex gap-3">
         <input
            type="text"
            placeholder="Enter new todos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e)=> e.key === "Enter" && handleSubmit(e)}
            className="flex border border-white px-15 py-3 text-white rounded-2xl placeholder:text-amber-50 focus:outline-none"
          />
          <button
            className="p-4 bg-green-300 rounded-full"
            onClick={handleSubmit}
          >
           <Plus size={20}/>
          </button>
     </div>
        </div>


        <div className="max-h-96 overflow-y-auto">

           {
  todos.length === 0 ? (
    <div className="p-8 text-center text-slate-400">
      <CheckCircle2 size={60} className="m-auto mb-1.5 opacity-50" />
      <p>No todos yet. Add one above!</p>
    </div>
  ) : (
    <ul className="space-y-1 p-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex gap-3 items-center p-4 bg-amber-200 rounded-2xl group"
        >
          <button onClick={() => complete(todo.id)}
            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${todo.completed ? "bg-green-500 border border-green-500" : ""}`}
            >
            <CheckCircle2 />
          </button>
          <span className={`flex-1 ${todo.completed ? "line-through text-slate-500" : ""}`}>{todo.text}</span>
          <button className="p-1 bg-red-500/20 rounded-full" onClick={() => remove(todo.id)}>
            <X />
          </button>
        </li>
      ))}
    </ul>
  )
}
        </div>

{
    todos.length > 0 &&
        <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex justify-between text-sm text-slate-300">
                <span>{todos.filter(t => !t.completed).length} remaining</span>
                <span>{todos.filter(t => t.completed).length} completed</span>
              </div>
            </div>
}

       </div>
       
      </div>
    </div>
  );
};

export default Todos;
