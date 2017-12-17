function getLocation(location){
    if (location){
        return <p>Location: {user.location}</p>;
    }
    else
        return;
}

const user = {
    name: 'Marcelina',
    age: 24,
    location: 'Ruda Śląska',
    options: ['First', 'Second']
};
let templateTwo = (
    <div>
        <h1>{user.name ? user.name : "Anon"}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        <p>{user.options.length > 0 ? 'Options' + user.options[0] + user.options[1] : "No options"}</p>

    </div>
)
const appRootTwo = document.getElementById("two");
const theId = 'add'
let count = 0;
const add = () =>  {
    count++;
    renderCounter();
    console.log('add')};
const substract = () =>{
    count--;
    renderCounter();
    console.log('substract');
};

const reset = () => 
{
    count = 0;
    renderCounter();
    console.log('reset');
}

const renderCounter = () => {
const templateThree = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={add}>Add</button>
        <button onClick={substract} className="button">Substract</button>
        <button onClick={reset} className="button">Reset</button>
        
        </div>
    );
    ReactDOM.render(templateThree, appRootTwo)
};
renderCounter();