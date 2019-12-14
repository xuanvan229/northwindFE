import React from 'react';
import logo from './logo.svg';
import { Input, Button } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [
        {
          customerName: "Alfreds Futterkiste	" , 
          contactName: "Maria Anders	",
          address: "Obere Str. 57	", 
          city: "Berlin", 
          postalCode: "12209", 
          country: "Germany" 
        }
      ],
      initItem: {
        customerName: "",
        contactName: "",
        address: "",
        city:"",
        postalCode: "",
        country: "",
      },
      isEdit: false,
      index: null,
      customerName: "",
      contactName: "",
      address: "",
      city:"",
      postalCode: "",
      country: "",
      
    }
  }

  deleteItem = (index) => {
    const newArray = this.state.listCustomer.filter((item, i) => index !== i)
    this.setState({listCustomer: newArray})
  }

  handleEdit = (item, index) => {
    const newlistCustomer = [...this.state.listCustomer]
    this.setState({
      isEdit: true,
      index: index,
      initItem: newlistCustomer[index]
    })
  }

  saveEdit = () => {
    const newListlistCustomer = [...this.state.listCustomer]
    const {listCustomer, index, initItem} = this.state;
    // const index = this.state.index;
    newListlistCustomer[index] = initItem
    this.setState({
      isEdit: false,
      index: null,
      listCustomer: newListlistCustomer,
      initItem: {
        customerName: "",
        contactName: "",
        address: "",
        city:"",
        postalCode: "",
        country: "",
      }
    })
  }

  handleChange = (e, name) => {
    const { value } = e.target;
    let itemChange = Object.assign({}, this.state.initItem);
    itemChange[name] = value
    this.setState({
      initItem: itemChange,
    })
  }

  addCustomer = () => {
    const {customerName , contactName, address, city, postalCode, country } = this.state;
    // const itemChange = this.state.initItem
    // console.log("change state", initItem);
    const newCustomer = {customerName , contactName, address, city, postalCode, country }
    this.setState({
      listCustomer: [...this.state.listCustomer, this.state.initItem],
      initItem: {
        customerName: "",
        contactName: "",
        address: "",
        city:"",
        postalCode: "",
        country: "",
      }
    })
  }

  render() {

    console.log("item =>", this.state.newCustomer);
    const {isEdit, initItem} = this.state;
    return (
      <div className="App">
        <div  className="form">
          <div className="inputWraper">
            <Input className="input" placeholder="Customer Name" value={initItem.customerName} onChange={e => this.handleChange(e, "customerName")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Contact Name" value={initItem.contactName} onChange={e => this.handleChange(e, "contactName")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Address	" value={initItem.address} onChange={e => this.handleChange(e, "address")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="City" value={initItem.city} onChange={e => this.handleChange(e, "city")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="PostalCode" value={initItem.postalCode} onChange={e => this.handleChange(e, "postalCode")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Country" value={initItem.country} onChange={e => this.handleChange(e, "country")} />
          </div>
          <div className="buttonSubmit"> 
            {isEdit ? <Button type="primary" onClick={() => this.saveEdit()} >Save</Button> : <Button type="primary" onClick={() => this.addCustomer()} >Submit</Button>}
          </div>
        </div>
        <div className="tableView">
          <table>
            <thead>
              <tr>
                <th>
                CustomerID
                </th>
                <th>
                CustomerName
                </th>
                <th>
                ContactName
                </th>
                <th>
                Address
                </th>
                <th>
                City
                </th>
                <th>
                PostalCode
                </th>
                <th>
                Country
                </th>
                <th>
                Country
                </th>
              </tr>
              
            </thead>
            <tbody>
              {this.state.listCustomer.map((item, index) => (
                <tr key={item.customerName}>
                  <td>
                  {index + 1}
                  </td>
                  <td>
                  {item.customerName}
                  </td>
                  <td>
                  {item.contactName}
                  </td>
                  <td>
                  {item.address}
                  </td>
                  <td>
                  {item.city}
                  </td>
                  <td>
                  {item.postalCode}
                  </td>
                  <td>
                  {item.country}
                  </td>
                  <td>
                    <Button type="primary" shape="circle" icon="edit" onClick={() => this.handleEdit(item, index)}/>
                    <Button type="danger" shape="circle" icon="delete" onClick={() => this.deleteItem(index)}/>
                  </td>
                </tr>
              ))}
              <tr>
                
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    );
  }
}

export default App;
