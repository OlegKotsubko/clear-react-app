import logo from './logo.svg';
import './App.css';
import {useState} from "react";

const getTableCoordinates = (el) => {
  const { target } = el
  const table = [...target.parentElement.parentElement.children]
  const x = table.indexOf(target.parentElement)
  const y = [...target.parentElement.children].indexOf(target)

  return {
    x,
    y,
    table
  }
}

const setElemColor = (el, color) => {
  el.style.background = color
}

const setActiveItem = (area, ind1, ind2, x, y, elem) => {
  switch (area) {
    case 'topRight':
      if ((ind1 < x + 1) && (ind2 > y - 1)) {
        setElemColor(elem, 'red')
      }
      break;
    case 'bottomRight':
      if ((ind1 > x - 1) && (ind2 > y - 1)) {
        setElemColor(elem, 'red')
      }
      break;
    case 'bottomLeft':
      if ((ind1 > x - 1) && (ind2 < y + 1)) {
        setElemColor(elem, 'red')
      }
      break;
    default:
      if ((ind1 < x + 1) && (ind2 < y + 1)) {
        setElemColor(elem, 'red')
      }
  }
}

const setTableActiveArea = (e, area) => {
  const {x, y, table} = getTableCoordinates(e)

  table.map((item, tableIndex) => {
    const tableChildren = [...item.children]

    tableChildren.map((item, childrenIndex) => {
      setElemColor(item, 'transparent')

      setActiveItem(area, tableIndex, childrenIndex, x, y, item);

      return false
    })
    return false
  })
}

function App() {
  const [area, setArea] = useState('');
  const [clicked, setClicked] = useState(false)
  const arr = new Array(10)

  const onClickHandler = (e) => {
    const {x, y, table} = getTableCoordinates(e);

    setClicked(!clicked);

    table.map(item => {
      const tableChildren = [...item.children]
      tableChildren.map(item => {
        if((x < table.length / 2) && (y < tableChildren.length / 2)) {
          setArea('topLeft')
        }
        if((x > table.length / 2) && (y < tableChildren.length / 2)) {
          setArea('bottomLeft')
        }
        if((x < table.length / 2) && (y > tableChildren.length / 2)) {
          setArea('topRight')
        }
        if((x > table.length / 2) && (y > tableChildren.length / 2)) {
          setArea('bottomRight')
        }
        return item
      })
      return item
    })
  }

  const mouseMoveHandlerTd = (e) => {
    if(clicked) {
      setTableActiveArea(e, area)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table className="table">
          <tbody>
          {arr.fill(0).map((item, index) => (
            <tr key={index + item}>
              {arr.fill(0).map((item, index) => (
                <td
                  key={index + item}
                  className="grid__item"
                  onMouseMove={mouseMoveHandlerTd}
                  onClick={onClickHandler}
                >
                  {index + 1 + item}
                </td>)
              )}
            </tr>)
          )}
          </tbody>

        </table>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
