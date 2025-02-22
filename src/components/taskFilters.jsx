const TaskFilters = ({ setFiltersObj }) => {
    
    const handleFilter = (key, value) => {
        setFiltersObj((prev) => {
            const newObj = { ...prev };
            newObj[key] = value;
            return newObj;
        });
    };
    return (
        <div>
            <div>
                <label>Priority</label>
                <select
                    name="priority"
                    onChange={(e) => {
                        handleFilter("priority", e.target.value);
                    }}
                >
                    <option value="">--Select--</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;