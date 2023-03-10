## use validations

Pretty simple validator example,

```
import useValidations, { noEmpty } from "use-validations";

function App()  {
	const  {  handleInputChange,  data,  errors  }  = useValidations<{  name:  string  }>({
		defaultData: { name: "" },
		validators: { name: noEmpty }
	});

	return (
		<div className="App">
			<label htmlFor="user-name">Username</label>

			<input
				id="user-name"
				type="text"
				onChange={handleInputChange("name")}
				value={data.name}
			/>

			{errors.name && <small>{errors.name}</small>}
		</div>
	);
}
export default App;
```

the validator function receives a string with the value to validate and stores in the `errors` object, `null` if the value to validate is valid or a string with the description of the validation error.

Example of a custom validator with more than one validation:

```
import useValidations from "use-validations";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";

const customValidator =  (date:  string)  =>  {
	const  diffDays  = differenceInBusinessDays(new Date(date),  new Date());
	// if the difference of days is less than or equal to -1, it is today or before today.
	if (diffDays  <=  -1) {
		return  "the date should be higher than today.";
	}
	// if the difference in days is greater than or equal to 3, it is 3 days or more in the future.
	if (diffDays  >=  3) {
		return "the date should not be more than 3 days after the current date.";
	}

	return  null;
};

function App()  {
	const { handleInputChange, data, errors } = useValidations<{
		scheduleDate:  string;
	}>({
		defaultData: { scheduleDate: "" },
		validators: { scheduleDate: customValidator },
	});

	return (
		<div  className="App">
			<label  htmlFor="schedule-date">Schedule Date</label>
			<input
				id="schedule-date"
				type="date"
				onChange={handleInputChange("scheduleDate")}
				value={data.scheduleDate}
			/>
			{errors.scheduleDate && <small>{errors.scheduleDate}</small>}
		</div>
	);
}
export default App;
```

### return values.

| Key               | Value                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| data              | Object with the field name as key and a validating function as value.                                               |
| errors            | Object with the field name as key and string error or null as value.                                                |
| emptyForm         | Boolean value that does what it promises.                                                                           |
| handleInputChange | Function to handle data changes.                                                                                    |
| hasErrors         | Boolean value that does what it promises.                                                                           |
| doValidate        | Function that runs all validations, and returns a boolean true if no validation gives an error and false otherwise. |
| resetData         | Function to reset the data to default values.                                                                       |
