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

    const isProperty = key => key !== "children"
    Object.keys(element.props)
    .filter(isProperty)
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

/** @jsx AutoDidact.myCreateElement */
// const element = (
//     <div style="background: salmon">
//       <h1>Hello World</h1>
//       <h2 style="text-align:right">from AutoDidact</h2>
//     </div>
//   );

  const element = AutoDidact.myCreateElement('h1', {id: 'foo'}, 'Hello');

// Same
const container = document.getElementById('root'); 

// ReactDOM.render
AutoDidact.myRender(element, container);

