import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Autocomplete from "../components/_autoComplete";
import Table from '../components/_table'
import data from '../data/index.json';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterData: [],
            name: '',
            kiloMeter: ''
        }
    }

    onChange = (e) => {
        const value = e.target.value
        const splitName = value.split(" (")
        // this.setState({
        //     [e.target.name]: e.target.value
        // });

        let filterData = data.filter(function (e) {
            
            return splitName[0] == e['Attendee Name'];
        });
        this.setState({
            filterData: filterData
        })
    }

    // onSubmit = (e) => {
    //     e.preventDefault()
    //     const {name, kiloMeter} = this.state
    //     let filterData = data.filter(function (e) {
    //         return name == e['Attendee Name'];
    //     });
    //     this.setState({
    //         filterData: filterData
    //     })
    // }

    render(){
        const kiloMeter = Object.values(data.reduce((acc,cur)=>Object.assign(acc,{[cur.Ticket_Name]:cur}),{}))
        const {filterData} = this.state;
        return (
            <div className="auto">
                <Form onSubmit={this.onSubmit}>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="name" className="mr-sm-2">Search Name</Label>
                            <Autocomplete
                                suggestions={data && data.map((data) =>
                                    data["Attendee Name"] + " (" + data['Ticket_Name'] + " )"
                                )}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        </Col>
                        {/* <Col md={4}>
                        <FormGroup>
                            <Label for="exampleSelect" className="mr-sm-2">Kilo Meter</Label>
                            <Input  type="select" name="kiloMeter" id="kiloMeter" onChange={this.onChange}>
                                <option>Select KiloMeter</option>
                                {kiloMeter && kiloMeter.map((data) => 
                                    <option>{data.Ticket_Name}</option>
                                )}
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md={2}>
                        <FormGroup>
                            <Button color="info">Search</Button>
                        </FormGroup>  
                        </Col> */}
                    </Row>
                </Form>
                <div className="mt-5 filter-table">
                    {filterData &&
                        <Table
                            data={filterData}
                        />
                    }
                </div>
            </div>
          );
    }
}

export default Search;