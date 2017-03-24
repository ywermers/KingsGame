/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import _ from "underscore"

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   NavigatorIOS,
   TouchableOpacity,
   ListView,
   Modal,
   AsyncStorage,
   TouchableHighlight,
   TextInput,
   Image,
   SvgUri,
   Alert,
   Dimensions,
   BackgroundImage
 } from 'react-native';
 import SocketIOClient from 'socket.io-client';
 var socket =  SocketIOClient('https://sleepy-wave-31904.herokuapp.com/', {jsonp: false});


 var s1={rule: "Waterfall", pic: require("./cards/s1.png")};
 var s2={rule: "You", pic: require("./cards/s2.png")};
 var s3={ rule: "Me", pic: require("./cards/s3.png")};
 var s4={ rule:"Floor", pic: require("./cards/s4.png")};
 var s5={ rule:"Guys", pic: require("./cards/s5.png")};
 var s6={ rule: "Chicks",pic: require("./cards/s6.png")};
 var s7={ rule: "Heaven", pic: require("./cards/s7.png")};
 var s8={rule: "Mates", pic: require("./cards/s8.png")};
 var s9={rule: "Rhyme", pic: require("./cards/s9.png")};
 var s10={rule: "Categories", pic: require("./cards/s10.png")};
 var sj={rule:"Never Have I ever", pic: require("./cards/sj.png")};
 var sq= {rule:"Question", pic: require("./cards/sq.png")};
 var sk= {rule:"create a new rule", pic: require("./cards/sk.png")};
 var c1={rule: "Waterfall",pic: require("./cards/c1.png")};
 var c2={rule: "You",pic: require("./cards/c2.png")};
 var c3={ rule: "Me",pic: require("./cards/c3.png")};
 var c4={ rule:"Floor", pic: require("./cards/c4.png")};
 var c5={ rule:"Guys", pic: require("./cards/c5.png")};
 var c6={ rule: "Chicks" ,pic: require("./cards/c6.png")};
 var c7={ rule: "Heaven", pic: require("./cards/c7.png")};
 var c8={rule: "Mates", pic: require("./cards/c8.png")};
 var c9={rule: "Rhyme", pic: require("./cards/c9.png")};
 var c10={rule: "Categories", pic: require("./cards/c10.png")};
 var cj={rule:"Never Have I ever",pic: require("./cards/cj.png")};
 var cq= {rule:"Question", pic: require("./cards/cq.png")};
 var ck= {rule:"create a new rule", pic: require("./cards/ck.png")};
 var h1={rule: "Waterfall",pic:require("./cards/h1.png")};
 var h2={rule: "You",pic:require("./cards/h2.png")};
 var h3={ rule: "Me",pic:require("./cards/h3.png")};
 var h4={ rule:"Floor",pic:require("./cards/h4.png")};
 var h5={ rule:"Guys",pic:require("./cards/h5.png")};
 var h6={ rule: "Chicks",pic:require("./cards/h6.png")};
 var h7={ rule: "Heaven",pic:require("./cards/h7.png")};
 var h8={rule: "Mates",pic:require("./cards/h8.png")};
 var h9={rule:"Rhyme",pic:require("./cards/h9.png")};
 var h10={rule: "Categories",pic:require("./cards/h10.png")};
 var hj={rule:"Never Have I ever",pic:require("./cards/hj.png")};
 var hq= {rule:"Question",pic:require("./cards/hq.png")};
 var hk= {rule:"create a new rule", pic:require("./cards/hk.png")};
 var d1={rule: "Waterfall",pic:require("./cards/d1.png")};
 var d2={rule: "You",pic:require("./cards/d2.png")};
 var d3={ rule: "Me",pic:require("./cards/d3.png")};
 var d4={ rule:"Floor",pic:require("./cards/d4.png")};
 var d5={ rule:"Guys",pic:require("./cards/d5.png")};
 var d6={ rule: "Chicks",pic:require("./cards/d6.png")};
 var d7={ rule: "Heaven",pic:require("./cards/d7.png")};
 var d8={rule: "Mates",pic:require("./cards/d8.png")};
 var d9={rule:"Rhyme",pic:require("./cards/d9.png")};
 var d10={rule: "Categories",pic:require("./cards/d10.png")};
 var dj={rule:"Never Have I ever", pic:require("./cards/dj.png")};
 var dq= {rule:"Question",pic:require("./cards/dq.png")};
 var dk= {rule:"create a new rule", pic:require("./cards/dk.png")};

 var Deck = [s1, s2, s3, s4, s5, s6, s7 , s8, s9, s10, sj, sq, sk,
 c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, cj, cq, ck,
 d1, d2,d3, d4, d5, d6, d7, d8, d9, d10, dj, dq, dk,
 h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, hj, hq, hk];

export default class cups extends Component {
   constructor(props) {
     super(props);
   }
   render() {
     return (
       <NavigatorIOS
       initialRoute={{
         component: Main,
         title: "Kings Cup"
       }}
       style={{flex: 1}}
       />
     );
   }
 };

var Main = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds,
      modalVisible: false,
      groupName: '',
      groupList : [],
      query: '',
      numberOfGroups: 0,
      searchDescription: 'Groups Active'
    }
  },
  componentDidMount(){
    var self = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('https://sleepy-wave-31904.herokuapp.com/')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        responseJson.groups.reverse()
        this.setState({
          dataSource: ds.cloneWithRows(responseJson.groups),
          groupList: responseJson.groups,
          numberOfGroups: responseJson.groups.length
        });
      } else {
        console.log('error')
      }
    })
  },
  setModalVisible(){
    this.setState({modalVisible: !this.state.modalVisible})
  },
  createGame(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var self = this;
    var shuffledDeck = _.shuffle(Deck);
    fetch('https://sleepy-wave-31904.herokuapp.com/createGroup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupName: this.state.groupName,
        state: {
          cards: shuffledDeck,
          currentRule: 'Loading...'
        }
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        AsyncStorage.setItem('groupName', this.state.groupName)
        .then(() => {
          self.setState({
            groupList: self.state.groupList.unshift({id: this.state.groupName}),
            numberOfGroups: self.state.groupList.length,
            dataSource: ds.cloneWithRows(self.state.groupList),
            groupName: '',
            modalVisible: !self.state.modalVisible
          })
          self.props.navigator.push({
            component: Game,
            title: "Game"
          })
        })
      } else {
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },
  joinGame(id){
    AsyncStorage.setItem('groupName', id)
    .then(() => this.props.navigator.push({
      component: Game,
      title: "Game"
    }))
  },
  search(query){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(query.length > 0){
      var filteredGroupList = this.state.groupList.filter((x) => x.id.toLowerCase().indexOf(query) !== -1)
      if(filteredGroupList.length > 0){
        this.setState({
          dataSource: ds.cloneWithRows(filteredGroupList),
          numberOfGroups: filteredGroupList.length,
          searchDescription: 'Results Found'
        })
      } else{
        this.setState({
          dataSource: ds.cloneWithRows([]),
          numberOfGroups: 0,
          searchDescription: 'Results Found'
        })
      }
    } else{
      this.setState({
        dataSource: ds.cloneWithRows(this.state.groupList),
        numberOfGroups: this.state.groupList.length,
        searchDescription: 'Groups Active'
      })
    }
},
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <Image source={{uri:'https://images-na.ssl-images-amazon.com/images/I/51bSNGS8ENL.png'}} style={{height:100, width: 370, flex: 1,
      alignItems: 'center',
      opacity: 0.8}}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={styles.container}>
      <View style = {{flex: .9, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={[styles.buttoninput, {height: 40, textAlign: 'center', width: Dimensions.get('window').width}]}
        placeholder="Game Name"
        autoCapitalize="none"
        onChangeText={(text) => this.setState({groupName: text})}
      />

      <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={this.createGame}>
      <Text style={styles.buttonLabel}>Create Game</Text>
      </TouchableOpacity>
      </View>

      <View style={{flex: .1}}>
      <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.setModalVisible}>
      <Text style={styles.buttonLabel}>Retun to List of Games</Text>
      </TouchableOpacity>
      </View>
      </View>
      </Modal>

      <View style={{flex: .04}}></View>

      <View style={{flex: .1}}>
      <Text style={styles.textBig}>
      Tap a Group to Join
      </Text>
      <TextInput
        style={[styles.buttoninput, {height: 40, textAlign: 'center', width: Dimensions.get('window').width}]}
        placeholder="Search for a Game..."
        autoCapitalize="none"
        onChangeText={(query) => this.search(query)}
      />
      <Text style={styles.textSmall}>{this.state.numberOfGroups} {this.state.searchDescription}</Text>
      </View>

      <View style={{flex: .28}}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => (<TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={this.joinGame.bind(this,rowData.id)}><Text style={styles.buttonLabel}>{rowData.id}</Text></TouchableOpacity>)}/>
      </View>

      <View style={{flex: .05}}>
      <TouchableOpacity onPress={this.setModalVisible} style={[styles.button, styles.buttonBlue]}>
      <Text style={styles.buttonLabel}>Tap to Create Game</Text>
      </TouchableOpacity>
      </View>
      </Image>
    );
  }
})


 var Game = React.createClass({
   getInitialState(){
     return{
       id: '',
       cards: _.shuffle(Deck),
       currentRule: 'No kings cup rule yet ;)'
     }
   },
   componentDidMount(){
     var self = this;
     console.log(1);
     AsyncStorage.getItem('groupName')
     .then((groupName) => {
       console.log(2)
       this.setState({id: groupName})
       return groupName;
     })
     .then((groupName) => {
       socket.on(groupName, function(data){
         self.setState({
           cards: data[0].state.cards,
           currentRule: data[0].state.currentRule,
           id: groupName
         })
       })
      })
     .then(() => {
       console.log(4);
      fetch('https://sleepy-wave-31904.herokuapp.com/game/' + self.state.id)
      .then((response) =>  response.json())
      .then((responseJson) => {
        if(responseJson.success){
          console.log(5)
          console.log(responseJson)
         self.setState({
           cards: responseJson.group[0].state.cards,
           currentRule: responseJson.group[0].state.currentRule
         })
       } else{
         console.log('ERROR BOI', responseJson.err)
       }
     })
   }
   )},
   longpress(self){
     var seen =[]
     fetch('https://sleepy-wave-31904.herokuapp.com/game/' + self.state.id,{
       method: 'POST',
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         state: this.state
       }, function(key, val) {
         if (val != null && typeof val == "object") {
           if (seen.indexOf(val) >= 0) {
             return;
           }
           seen.push(val);
         }
         return val;
       })
      })
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.success){
         console.log("hey u r here")
         socket.emit("update", self.state.id) //undefined
       } else{
         console.log('ERROR BOI', responseJson.err)
       }
     })
   },
   render(){
     var self = this;
     var poop = self.state.cards[0].pic;
     var setRule = false;
     console.log(self.state.cards[0]);
     if(self.state.cards[0].rule==="create a new rule"){
       setRule=true
     };
     return(
       <View style={{flex:1}}>
    {setRule ? <View style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View style= {{flex: .5, marginLeft: 10, marginTop: -20}}><Text>Cards Remaining: {this.state.cards.length}</Text></View>
        </View>
        <View style ={{flex: 0.75, marginTop: -30}}><Text>Instructions: {this.state.cards[0].rule}</Text></View>
        <TouchableOpacity style ={{flex: 5}} onLongPress={ this.longpress.bind(null, self)} delayLongPress={500}>
          <View style ={{flex: 1, marginTop: -30}}>
            <Image
              style={{height: 400, width: 275}}
              source={poop}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 0.2, marginTop: -100, marginLeft: -80}}><Text>Rule: {this.state.currentRule}</Text></View>
        <View style={{flex: 0.8}}>
          <View style={{flex: 0.5, marginLeft: -40}}>
          <TextInput
            placeholder="type a rule"
            style={{height: 40, textAlign: 'center', width: 200, marginLeft: -60}}
            onChangeText={(text) => self.setState({currentRule: text})}
          />
          <TouchableOpacity onPress={this.longpress.bind(null, self)} style={[styles.buttonRed]} >
            <Text style={{height: 20, width: 100 }}>Submit Rule</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View> : <View style={styles.container}>
        <View style={{flex: 0.75}}></View>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View style= {{flex: .5, marginLeft: 10}}><Text>Cards Remaining: {this.state.cards.length}</Text></View>
        </View>
        <View style ={{flex: 0.8}}><Text>Instructions: {this.state.cards[0].rule}</Text></View>
        <TouchableOpacity style ={{flex: 5}} onLongPress={ this.longpress.bind(null, self)} delayLongPress={750}>
          <View style ={{flex: 1}}>
            <Image
              style={{height: 400, width: 275}}
              source={poop}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}><Text>Rule: {this.state.currentRule}</Text></View>
      </View>
    }
    </View>
  )
   }
 })

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonBlue: {
    backgroundColor: '#0098D1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonRed: {
   backgroundColor: '#FF004D',
 },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  textBig: {
    fontSize: 28,
    textAlign: 'center',
    margin: 15,
    color: 'white',
    backgroundColor: 'red',
    opacity: 0.8
  },
  textMedium: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    backgroundColor: 'white'
  },
  textSmall: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 80,
    opacity: 0.8
  },
  buttoninput: {
    alignSelf: 'stretch',
    marginTop: -10,
    color: 'black'
  },
  buttoninputs: {
    alignSelf: 'stretch',
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 3,
    height: 2,
    margin: 3,
    textAlign: 'center'
  }
});
AppRegistry.registerComponent('cups', () => cups);
