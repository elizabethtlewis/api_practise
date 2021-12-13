import React from "react";
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      students: []
    };
  }
    // this function executes code after render()
    componentDidMount() {
      fetch("https://api.hatchways.io/assessment/students")
        .then((res) => res.json())
        .then((json) => {

          this.setState({
            searchTerm:"",
            students: json.students
          });
        })
    }

    // Calculates each students average grade
    average_array(grades, length){
      let sum=0
      for(let i = 0; i < grades.length; i++) {
        sum += parseInt(grades[i]);
      }
      return (sum/length)
    }
    // Sets the search term when an input is made in the search bar
    onChange(val){
      this.setState({searchTerm: val})
    }

    render() {
      const { searchTerm, students } = this.state;

      return (
        <>
        <div className = "searchbar">
          <input type="text"
                 placeholder="Search by name"
                 onChange={(event) => this.onChange(event.target.value)}
                 >
          </input>
        </div>
          <hr className="solid"></hr>
          <div className = "student-info">
              {
                students.filter((students)=>{
                  if (searchTerm===""){
                    return students
                  } 
                  else if (students.firstName.toLowerCase().includes(searchTerm.toLowerCase())
                          || students.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                           || (students.firstName.toLowerCase()+" "+students.lastName.toLowerCase()).includes(searchTerm.toLowerCase())){
                    return students
                  }
                }
                )
                .map((student) => (
                  <ol key = { student.id }>
                  <div className = "students">
                      <div className = 'profile-picture'>
                        <img alt={`${student.firstName}'s profile`} src={student.pic} loading="lazy"/>
                      </div>
                      <div className="text">
                        <p className = "name">
                          {student.firstName.toUpperCase()+" "}
                          {student.lastName.toUpperCase()}
                        </p>
                        <div className = 'other-info'>
                          <p> Email:  {student.email}</p>
                          <p> Company:  {student.company}</p>
                          <p> Skill:  {student.skill}</p>
                          <p>{`Average: ${this.average_array(student.grades, student.grades.length)} %`}</p>
                        </div>
                      </div>
                  </div>
                  <hr className="solid"></hr>
                  </ol>
                ))
              }
          </div>
        </>
    );
  }
}
   
export default App;
