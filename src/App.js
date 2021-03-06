import React from 'react';
import './App.css'
import axios from 'axios';
import {Input, Button} from 'antd';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      newUser: {
        "CustomerID": 1,
        "CustomerName":  "",
        "ContactName": "",
        "Address": "",
        "City":  "",
        "PostalCode": "",
        "Country": ""
      }
    }
  }

  getData = async() => {
    try {
      const result = await axios.get("http://localhost:8080/user")
      this.setState({
        listUser: result.data.data
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  onChangeInput = (e, name) => {
    const {value} = e.target;
    const userCoppy = Object.assign({}, this.state.newUser)
    userCoppy[name]= value
    this.setState({
      newUser: userCoppy
    })
  }

  async componentDidMount() {
    await this.getData()
  }

  submitForm = async() => {
    const data = Object.assign({}, this.state.newUser)
    try {
      const result = await axios.post("http://localhost:8080/user/insert", data)
      await this.getData()
      this.setState({
        newUser: {
          "CustomerID": 1,
          "CustomerName":  "",
          "ContactName": "",
          "Address": "",
          "City":  "",
          "PostalCode": "",
          "Country": ""
        }
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  render() {
    const {listUser} = this.state;
    const {CustomerName, ContactName, Address, City, PostalCode, Country} = this.state.newUser
    return (
      <div className="App">
        <div className="form">
          <div className="inputWraper">
            <Input className="input" placeholder="CustomerName" value={CustomerName} onChange={e => this.onChangeInput(e, "CustomerName")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="ContactName"  value={ContactName} onChange={e => this.onChangeInput(e, "ContactName")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Address" value={Address}  onChange={e => this.onChangeInput(e, "Address")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="City" value={City} onChange={e => this.onChangeInput(e, "City")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="PostalCode" value={PostalCode} onChange={e => this.onChangeInput(e, "PostalCode")}/>
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Country" value={Country} onChange={e => this.onChangeInput(e, "Country")}/>
          </div>
          <div class="buttonSubmit">
            <Button onClick={this.submitForm} type="primary">
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
                  <tr>
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