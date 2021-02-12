import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "./react-table";
import "./react-table/react-table.css";  
import axios from 'axios'

class App extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      roll:"",
      name:"",
      email:"",
      marks:"",
      update:false,
      data:[],
      view:[]
    }
  }
  
  
componentDidMount(){
    axios.get("http://localhost:7788/api/fetch")
    .then(response=>{
      this.setState({data:response.data})
     } )
    .catch(error=>{
        alert(error)
     })
}
    
    
  
  
  
  //adding value to state
  change=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  
  
  //sending data to server
  send=()=>{
    const body={
      roll:this.state.roll,
      name:this.state.name,
      email:this.state.email,
      marks:this.state.marks
    }
    
   axios.post("http://localhost:7788/api/send",body)
   .then(response=>{
     this.setState({
      roll:"",
      name:"",
      email:"",
      marks:""
     }).catch(error=>{
        alert(error)
     })
     
   })
  }
  
  //not load
  load=(event)=>{
    return false;
event.preventDefault()
  }
  
  //edit data
  edit=(e)=>{
    
    this.setState({update:true})
    axios.get("http://localhost:7788/api/fetch")
    .then((res)=>{
      this.setState({
      roll:res.data[e-1].roll,
      name:res.data[e-1].name,
      email:res.data[e-1].email,
      marks:res.data[e-1].marks
        
      })
    }).catch(err=>{
      console.log(err);
    }
      )
    
  
  }
  
//update edited data

update=()=>{
const body={
      roll:this.state.roll,
      name:this.state.name,
      email:this.state.email,
      marks:this.state.marks
    }
    
 axios.put("http://localhost:7788/api/up",body)
   .then(response=>{
     this.setState({
      roll:"",
      name:"",
      email:"",
      marks:"",
      update:false
     }).catch(error=>{
        alert(error)
     })
     
   })
    
}
    
    //delele data
    del=(e)=>{
      axios.delete("http://localhost:7788/api/delete/"+e)
  .then(response=>{
    alert("data deleted")
    
     }).catch(error=>{
        alert(error)
     })
     
    }
    
    
  
  
  
  
  render(){
  
  

const columns = [{
Header:"Roll",
accessor:'roll',
},{  
       Header: 'Name',  
       accessor: 'name'  
      },{  
      Header: 'email',  
      accessor: 'email'  
      },{
        Header:"marks",
        accessor:"marks"
      },{
Header:"edit",
      Cell:({row})=><span class="glyphicon glyphicon-pencil" id="edit" onClick={()=>this.edit(row.roll)}></span>
      
      },{
       Header:"del",
Cell:({row})=><span class="glyphicon glyphicon-trash" id="del" onClick={()=>this.del(row.roll)}></span>
      }]
  return (
    <div className="App">
    <nav></nav>
<ReactTable  
            data={this.state.data}  
            columns={columns}  
            defaultPageSize = {4}  
            pageSizeOptions = {[2,4, 6]}  
         />  
 <br></br>
 <center>
   <form onSubmit={this.load}><br></br>
  <input type="number" id="in" name="roll" value={this.state.roll} onChange={this.change} placeholder="roll"/>&nbsp;&nbsp;
    
  <input type="text" id="in" name="name" value={this.state.name} onChange={this.change} placeholder="name"/>&nbsp;&nbsp;
    
  <input type="email" id="in" name="email" value={this.state.email} onChange={this.change} placeholder="email"/>&nbsp;&nbsp;
    
  <input type="marks" id="in" name="marks" value={this.state.marks} onChange={this.change} placeholder ="marks"/>&nbsp;&nbsp;
  
  {this.state.update?<button onClick={this.update} id="btn-add">update</button>:<button onClick={this.send} id="btn-add">add</button>}
         </form></center>
    </div>
  );
}
}

export default App;

