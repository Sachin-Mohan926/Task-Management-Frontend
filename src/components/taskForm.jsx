import PropTypes from "prop-types";
import '../assets/taskForm.css';

const TaskForm = ({ getData }) => {
    const addTask = async (obj) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(obj),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("success");
            getData();
        } else {
            alert(respObj.message);
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (e.target.assignee.value.length > 3) {
            const dataObj = {
                taskTitle: e.target.taskTitle.value,
                assignee: e.target.assignee.value,
                deadline: e.target.deadline.value,
                priority: e.target.priority.value,
                assignor: "Sachin Kumar Mohan",
            };

            addTask(dataObj);
        } else {
            alert("Task Title and assignee is required");
        }
    };

    return (
        <div>
            <form onSubmit={handleAddTask}>
                <div>
                    <label>Task Title</label>
                    <input type="text" name="taskTitle" />
                </div>
                <div>
                    <label>Assignee</label>
                    <input type="email" name="assignee" required />
                </div>
                <div>
                    <label>Deadline</label>
                    <input type="datetime-local" name="deadline" />
                </div>
                <div>
                    <label>Priority</label>
                    <select name="priority">
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <button>Add Task</button>
            </form>
        </div>
    );
};

TaskForm.propTypes = {
    getData: PropTypes.func.isRequired,
};

export default TaskForm;