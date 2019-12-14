import React from 'react';
import axios  from 'axios';
import './App.css';
import { Input, Button } from 'antd'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      listUser: [],
      newUser: {
        "CustomerID": 1,
        "CustomerName":  "FPT",
        "ContactName": "Xuan",
        "Address": "Ho guom",
        "City":  "Ha Noij",
        "PostalCode": "123123",
        "Country": "VietNam"
      }
    }
  }
  getData = async() => {
    try {
      const result = await axios.get('http://localhost:8080/user');
      if(result.status === 200) {
        this.setState({
          listUser:result.data.data
        })
      }
    } catch (error) {
      console.log("error");
    }
  }
  async componentDidMount() {
    await this.getData()
  }

  onChange = (e, name) =>  {
    const { value } = e.target;
    let itemChange = Object.assign({}, this.state.newUser);
    itemChange[name] = value
    this.setState({
      newUser: itemChange,
    })
  }

  onSubmit = async() => {
    const data = Object.assign({}, this.state.newUser);
    const result = await axios.post('http://localhost:8080/user/insert', data)
    if(result.status === 200) {
      await this.getData()
    }
  }


  render() {
    console.log("this.state", this.state)
    const {listUser} = this.state;
    return (
      <div className="App">
        <div className="form">
            <div class="inputWraper">
              <Input className="input" placeholder="CustomerID" onChange={e => this.onChange(e, "CustomerID")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="CustomerName" onChange={e => this.onChange(e, "CustomerName")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="ContactName" onChange={e => this.onChange(e, "ContactName")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="Address" onChange={e => this.onChange(e, "Address")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="City" onChange={e => this.onChange(e, "City")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="PostalCode" onChange={e => this.onChange(e, "PostalCode")}/>
            </div>
            <div class="inputWraper">
              <Input className="input"placeholder="Country" onChange={e => this.onChange(e, "Country")}/>
            </div>
            <div className="buttonSubmit">
              <Button onClick={this.onSubmit}>
                  Submit
              </Button>
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
              </tr>
            </thead>
            <tbody>
              {
                listUser.map(item => (
                  <tr key={item.customerid}>
                    <td>
                      {item.customerid}
                    </td>
                    <td>
                      {item.customername}
                    </td>
                    <td>
                      {item.contactname}
                    </td>
                    <td>
                      {item.address}
                    </td>
                    <td>
                      {item.city}
                    </td>
                    <td>
                      {item.postalcode}
                    </td>
                    <td>
                      {item.country}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;