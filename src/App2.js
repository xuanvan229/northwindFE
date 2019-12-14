import React from 'react';
import './App.css';
import axios from 'axios'
import {Input, Button} from 'antd';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listUser: [],
      newUser: {
        "CustomerID": "",
        "CustomerName":  "",
        "ContactName": "",
        "Address": "",
        "City":  "",
        "PostalCode": "",
        "Country": ""
      }
    }
  }

  onChangeInput = (e, name) => {
    const {value} = e.target;
    const userCoppy = Object.assign({}, this.state.newUser)
    userCoppy[name] = value
    this.setState({
      newUser: userCoppy
    });
  }


  getData  = async () => {
    try {
      const result = await axios.get("http://localhost:8080/user")
      if(result.status === 200) {
        this.setState({
          listUser: result.data.data
        })
      }
    }catch(error) {
      console.log("error", error)
    }
  }

  submitForm = async() => {
    const data = Object.assign({}, this.state.newUser)
    try {
      const result = await axios.post("http://localhost:8080/user/insert", data)
      if(result.status === 200) {
        const resetUser = {
          "CustomerID": "",
          "CustomerName":  "",
          "ContactName": "",
          "Address": "",
          "City":  "",
          "PostalCode": "",
          "Country": ""
        }
        this.setState({newUser: resetUser});
        await this.getData()
      }
    } catch(error) {
      console.log("error", error);
    }
  }

  async componentDidMount() {
    await this.getData()
  }
  render() {

    const {listUser} = this.state;
    const {CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country} = this.state.newUser;
    return (
      <div className="App">
        <div className="form">
          <div className="inputWraper">
            <Input className="input" placeholder="CustomerID" value={CustomerID} onChange={e => this.onChangeInput(e, "CustomerID")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="CustomerName" value={CustomerName} onChange={e => this.onChangeInput(e, "CustomerName")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="ContactName" value={ContactName} onChange={e => this.onChangeInput(e, "ContactName")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Address" value={Address} onChange={e => this.onChangeInput(e, "Address")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="City" value={City} onChange={e => this.onChangeInput(e, "City")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="PostalCode" value={PostalCode} onChange={e => this.onChangeInput(e, "PostalCode")} />
          </div>
          <div className="inputWraper">
            <Input className="input" placeholder="Country" value={Country} onChange={e => this.onChangeInput(e, "Country")} />
          </div>
          <div className="buttonSubmit">
            <Button type="primary" onClick={this.submitForm}>
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
                listUser.map(item  => (
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