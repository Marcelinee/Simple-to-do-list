/*let toggle = 1;

const toggleInfo = () => {
    toggle = !toggle;
    renderTemplate();
    console.log(toggle);
}
const renderTemplate = () => {
    const template = (
        <div>
            <h1>Toggle</h1>
            <button onClick={toggleInfo}>{toggle ? "Hide details": "Show details"}</button>
           {
               toggle && (
                <p id="parag">The stuff</p>
               )
           } 
        </div>
    )
    ReactDOM.render(template, app);
};
const app = document.getElementById("app");
renderTemplate();*/

class Hidde extends React.Component {
    
    constructor(props) {
        super(props);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.state = {
            toggle: 1
        };
    }

    render() {
        return (
                <div>
                    <h1>Toggle</h1>
                    <button onClick={this.toggleInfo}>{this.state.toggle ? "Hide details": "Show details"}</button>
                   {
                       this.state.toggle && (
                        <p id="parag">The stuff</p>
                       )
                   } 
                </div>
            ) 
    }

    toggleInfo() {
        console.log('toggle');
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            }
        }
        );
    }
}

ReactDOM.render(<Hidde />, document.getElementById('app'));