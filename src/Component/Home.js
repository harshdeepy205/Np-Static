import React, { useState, } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Grid,
} from '@material-ui/core'
import { Graph } from 'react-d3-graph'
import Expense from '../classes/expense'
import { splitwise } from '../utils/splitwise'

const Home = () => {
  const [name, setName] = useState('')
  // const [allNames, setAllNames] = useState(["Person1", "Person2", "Person3", "Person4", "Person5", "Person6"])
  const allNames = ["Person1", "Person2", "Person3", "Person4", "Person5", "Person6"]
  const [node1, setNode1] = useState(["Node1", "Node2", "Node3", "Node4", "Node5", "Node6"])
  const [distance, setDistance] = useState(["22", "25", "26", "19", "32", "30"])


  const [flag, setFlag] = useState(true)
  const [finalValues, setFinalValues] = useState({
    "node1": "",
    "node2": "",
    "distance": ""
  })
  const [items, setItems] = useState([])
  const [outputList, setOutputList] = useState([])

  // const { node1, node2, distance} = finalValues;

  const [inputGraphData, setInputGraphData] = useState({})
  const [inputGraphConfig, setInputGraphConfig] = useState({})

  const [outputGraphData, setOutputGraphData] = useState({})

  const handleFinalChange = name => event => {
    setFinalValues({ ...finalValues, [name]: event.target.value })
  }


  const handleChange = (event) => {
    setName(event.target.value)
  }

  const addParticipant = event => {
    event.preventDefault();
    console.log(allNames)
    // setAllNames(previous => [{ name }, ...previous])
    setName('')
  }

  const listOfNames = () => {
    return (
      <div className="allnames">
        <h3>Names</h3>
        {
          allNames.map((item, index) => (
            <h4 style={{ color: "#3f3f3f" }} key={index}> { item}</h4>
          ))
        }

        {/* { allNames.map(item => (
          <h2>{item} </h2>
        ))} */}
      </div>
    )
  }

  const handleOpenForm = () => {
    setFlag(!false)
  }

  const finalForm = () => {
    return (
      <div>

        <TableContainer component={Paper} className="table">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <InputLabel>Node 1</InputLabel>
                  <Select onChange={handleFinalChange("node1")}>
                    {/* {<MenuItem value="Select" selected>Select</MenuItem> */}
                    {allNames.map(item =>
                    ((allNames !== item.name) ? <MenuItem value={item}>{item}</MenuItem> : <></>
                    ))
                    }
                  </Select>
                </TableCell>

                <TableCell>
                  <InputLabel>Node 2</InputLabel>
                  <Select onChange={handleFinalChange("node2")}>
                    {/* {<MenuItem value="Select" selected>Select</MenuItem> */}
                    {node1.map(item =>
                    ((node1 !== item.name) ? <MenuItem value={item}>{item}</MenuItem> : <></>
                    ))
                    }
                  </Select>
                </TableCell>

                <TableCell>
                  <InputLabel>Amount</InputLabel>
                  <Select onChange={handleFinalChange("distance")}>
                    {/* {<MenuItem value="Select" selected>Select</MenuItem> */}
                    {distance.map(item =>
                    ((distance !== item.name) ? <MenuItem value={item}>{item}</MenuItem> : <></>
                    ))
                    }
                  </Select>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary">Submit</Button>
      </div>
    )
  }

  const myForm = () => {
    function addValues() {
      if ((finalValues['person1'] !== "") && (finalValues['person2'] !== "") && (finalValues['amount'] !== "")) {
        setItems([...items, finalValues])
      } else {
        alert("Enter all Fields")
      }
      setFinalValues({
        ...finalValues,
        "person1": "",
        "person2": "",
        "amount": ""
      })
    }
    return (
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Node1</TableCell>
              <TableCell align="center">Node2</TableCell>
              <TableCell align="center">Distance</TableCell>
              {/* <TableCell align="center">Add</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person1
                </TableCell>
              <TableCell align="center">Node1</TableCell>
              <TableCell align="center">22</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person2
                </TableCell>
              <TableCell align="center">Node2</TableCell>
              <TableCell align="center">25</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person3
                </TableCell>
              <TableCell align="center">Node3</TableCell>
              <TableCell align="center">26</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person4
                </TableCell>
              <TableCell align="center">Node4</TableCell>
              <TableCell align="center">19</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person5
                </TableCell>
              <TableCell align="center">Node5</TableCell>
              <TableCell align="center">32</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" align="center" scope="row">
                Person6
                </TableCell>
              <TableCell align="center">Node6</TableCell>
              <TableCell align="center">30</TableCell>
            </TableRow>

            <TableRow>
              {/* <TableCell align="center">
                <FormControl>
                  <InputLabel>Payer</InputLabel>
                  <Select value={person1} onChange={handleFinalChange("person1")}>
                    {allNames.map(item => (
                      <MenuItem value={item.name} >{item.name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </TableCell> */}


              {/* <TableCell align="center">
                <FormControl>
                  <InputLabel>Payee</InputLabel>
                  <Select value={person2} onChange={handleFinalChange("person2")}>
                    {allNames.map(item =>
                    ((person1 !== item.name) ? <MenuItem value={item.name}>{item.name}</MenuItem> : <></>
                    ))
                    }
                  </Select>
                </FormControl>
              </TableCell> */}


              {/* <TableCell align="center">
                <FormControl>
                  <TextField
                    id="standard-number"
                    label="Amount"
                    type="number"
                    value={amount}
                    placeholder="Emter Amount"
                    onChange={handleFinalChange("amount")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </TableCell> */}


              {/* <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={(e) => { addValues() }}
                >
                  + ADD
                </Button>

              </TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const handleTransactionDataSubmit = () => {
    console.log("Participants: ", allNames, " transactions: ", items)
    const data = {
      nodes: generateNodes(),
      links: generateLinks(),
    }
    const config = {
      freezeAllDragEvents: true,
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        highlightStrokeColor: "blue",
        fontSize: 12,
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: true,
        labelProperty: "amount",
        fontSize: 12,
      },
      directed: true,
      height: 600,
      width: 600,
    };

    setInputGraphData(data)
    setInputGraphConfig(config)
  }

  const generateNodes = () => allNames.map(item => ({ id: item.name }))

  const generateLinks = () => items.map(({ person1, person2, amount }) => ({ source: person1, target: person2, amount }))

  const generateOutputLinks = (items) => items.map(({ person1, person2, amount }) => ({ source: person1, target: person2, amount }))

  const splitwiseTransactions = () => {
    const input = []
    for (let item of items) {
      input.push(new Expense(item.person1, item.person2, parseInt(item.amount)))
    }
    const output = splitwise(input)
    console.log('output: ', output)
    setOutputList(output)
    setOutputGraphData({ nodes: generateNodes(), links: generateOutputLinks(output) })
  }

  return (
    <div>
      {/* <div className="name-component">
      </div> */}

      {
        flag ? (
          <>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div>
                  <div>
                    <h4>Transactions</h4>
                    <div style={{ textAlign: "left" }}>
                      <p>Enter transactions in the table below :-</p>
                      <ol>
                        <li>Enter the names of the Payer in first column</li>
                        <li>Enter the names of the Payee in second column</li>
                        <li>Enter the amount paid in the third column</li>
                        <li>Click on Build Graph to build a graph from the given transactions</li>
                        <li>Click on Simplify payments button when you are done with entering the payments.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="form">
                  {flag && myForm()}
                </div>

                {items && items.length ? (
                  <div className="form-names">
                    <Button variant="contained" color="primary" onClick={handleTransactionDataSubmit}>Build Graph</Button>
                    <Button variant="contained" color="secondary" onClick={splitwiseTransactions}>Simplify Settlements</Button>
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} md={6}>
                {Object.keys(inputGraphData).length && Object.keys(inputGraphConfig).length ? (
                  <>
                    <h5>Generated graph from the transactions entered</h5>
                    <Graph
                      id="graph-id" // id is mandatory
                      data={inputGraphData}
                      config={inputGraphConfig}
                    />
                  </>
                ) : null}
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                {
                  outputList && outputList.length ? (
                    <>
                      <h3> Simplified Settlement</h3>
                      <TableContainer component={Paper} className="table">
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Payer</TableCell>
                              <TableCell align="center">Payee</TableCell>
                              <TableCell align="center">Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {outputList.length && outputList.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" align="center" scope="row">
                                  {row.person1}
                                </TableCell>
                                <TableCell align="center">{row.person2}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : null
                }
              </Grid>
              <Grid item xs={12} md={6}>
                {
                  Object.keys(outputGraphData).length && Object.keys(inputGraphConfig).length ? (
                    <>
                      <h5>Graph generated from the solution of algorithm</h5>
                      <Graph
                        id="graph-id-output" // id is mandatory
                        data={outputGraphData}
                        config={inputGraphConfig}
                      />
                    </>
                  ) : null
                }
              </Grid>
            </Grid>
          </>
        ) : null
      }

      {finalForm()}

    </div >
  )
}

export default Home