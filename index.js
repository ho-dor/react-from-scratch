// React.createElement

// React.createElement('div', {id: 'foo'}, 'foo') => {type: 'div', props: {id: 'foo', children: "foo"}}
function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}

function myCreateElement(type, props, ...children) {
    return {
        type,
        props:{
            ...props,
            children: children.map(child => {
                return typeof child === 'object' ? child : createTextElement(child)
            })
        }
    }
}

function myRender(element, container){
    const dom =  element.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type)

    const isProp = key => key !== "children"

    // for props other than children
    Object.keys(element.props)
    .filter(isProp)
    .forEach(name => {
      dom[name] = element.props[name]
    })

    element.props.children.forEach(child => myRender(child, dom));

    container.appendChild(dom);
}

const AutoDidact = {
    myCreateElement,
    myRender
}

// ----------------------------------------------------------------------


const element = AutoDidact.myCreateElement('h1', {id: 'foo'}, 'Hello');

// Same
const container = document.getElementById('root'); 

// ReactDOM.render
AutoDidact.myRender(element, container);

