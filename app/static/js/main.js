"use strict";

//This is the enum on toggling navBar
var NavBarButton = {
	ParseTag: 1,
	Help: 2,
	About: 3,
};
//This is the enum on toggling the input tag
var TagName = {
    Type1: 1,
    Type2: 2
};
//This is to make paragraph to line break by character
var divStyle = {
    wordWrap: "break-word"
};
//navBar class
var NavBar= React.createClass({

    //Spit you active or inactive for className based on the parents' state
    activeOrNot: function (vari) {
    	if (vari == this.props.page ){
    		return "active";
    	} else {
    		return "inactive";
    	}
    },
    //handle click to its parents
    handleClick: function(clickButton) {
        
        this.props.didClick(clickButton);
        return false;
    },
    //normal bootstrap navBar
	render: function(){
		return ( <nav className="navbar navbar-default navbar-static-top">
					<div className="container">
						<a href= '#' className="navbar-brand" onClick = {this.handleClick.bind(null, NavBarButton.ParseTag)}>TagParser</a>
						<div className="collapse navbar-collapse">
	     					 <ul className="nav navbar-nav navbar-right">
	       						 <li className = {this.activeOrNot(NavBarButton.ParseTag)} >
	         						 <a href="#" onClick = {this.handleClick.bind(null, NavBarButton.ParseTag)}>ParseTag</a>
	        					</li>
	       						 <li className= {this.activeOrNot(NavBarButton.Help)} >
	         						 <a href="#" onClick = {this.handleClick.bind(null, NavBarButton.Help)}>Help</a>
	        					</li>
	       						 <li className= {this.activeOrNot(NavBarButton.About)} >
	          						<a href="#" onClick = {this.handleClick.bind(null, NavBarButton.About)}>About</a>
	        					</li>
						      </ul>
						</div>
					</div>
			     </nav>
			);
	}
});

//class to create the table
var ResultTable = React.createClass({
    //table that renders type1 tag
    renderType1: function() {
        var table = this.props.table
        var tableBody = "";
        if (table.table.hasOwnProperty("result")) {
            tableBody = table.table.result.map(function(row){
                return (
                    <tr>
                        <th>{row.Module}</th>
                        <th>{row.Property}</th>
                        <th>{row.Value}</th>
                    </tr>
                    );
            });

        }
                

        return (
            <table className = "table">
                <thead>
                    <tr>
                        {table.header.map(function(header){
                            return (<th> {header}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
                
            
            );
    },
    //table to render type2 tag
    renderType2: function(){
        var string = this.props.tagText;
        var tableHead = (
            <thead>
                <tr>
                    <th>Head</th>
                    <th>Tail</th>
                </tr>
            </thead>
            );
        //for the type2 tag I parse the first 7 characters and the last 10 characters
        var tableBody = (
            <tbody>
                <tr>
                    <th> {string.substr(0, 7)}</th>
                    <th> {string.substr(string.length-10, 10)}</th>
                </tr>
            </tbody>
            );
        return (
            <table className = "table">
            {tableHead}
            {tableBody}
            </table>
            );

    }, 
    //render the table based on the parents' state

    render: function() {
        switch (this.props.tagLabel) {
        case TagName.Type1:
            return this.renderType1();
            break;
        case TagName.Type2:
            return this.renderType2();
            break;
        default:
            return (<h1>YOU SHOULD NOT SEE THIS</h1>);
        }
    	

    }
});
//the form to take input from user
var TagForm = React.createClass({
    //get user input through ref
	parseString: function() {
		var tag = this.refs.parseTag.getDOMNode().value;
        document.getElementById("parseTag").value = '';
		this.props.parsetag(tag);

        return false;
	},
    //toggle the tag
    toggleTag: function(tag){
        this.props.toggle(tag);
        return false;
    },
    //render the form
	render: function() {
        //get the tag name
        var tag = "Type1 Tag";
        if (this.props.tagLabel == TagName.Type2) {
            tag = "Type2 Tag";
        }
		return (
			<form className ="form-inline">
  				<div className="form-group">	
    				<div className="input-group">
                        <div className="input-group-btn">
                             <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{tag}<span className="caret"></span></button>
                             <ul className="dropdown-menu">
                                <li><a href="#" onClick = {this.toggleTag.bind(null, TagName.Type1)}>Type1 Tag</a></li>
                                 <li><a href="#" onClick = {this.toggleTag.bind(null, TagName.Type2)}>Type2 Tag</a></li>
                             </ul>
                        </div>
      						<input type="text" ref="parseTag" className="form-control" id="parseTag" placeholder="enter the tag"/>
    					</div>
  					</div>
 				<input className="btn btn-default" type="button" value="Parse" onClick={this.parseString}/>
			</form>

			);
	}
});
//first page container 
var FirstPage = React.createClass({

	toggleTag: function(tag) {
        this.props.toggle(tag)
    },
    parseString: function(tag) {
        this.props.parsed(tag);
	},
	
	render: function() {

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<TagForm parsetag = {this.parseString} tagLabel = {this.props.state.tagLabel} toggle = {this.toggleTag}/>
					</div>
				</div>
				<div className="row">
					
					<div className="col-md-12">
						
						<ResultTable table = {this.props.state} tagLabel = {this.props.state.tagLabel} tagText = {this.props.state.tagText}/>
						
					</div>
				</div>
			</div>
			);
	}

});
//The page container including other pages
var PageContainer = React.createClass({
    //set initial state
    getInitialState: function() {
        return {navButton: NavBarButton.ParseTag, header: ["Module", "Property", "Value"], table: [], tagLabel: TagName.Type1, tagText: ""};
    },
    //toggle tag
    toggleTag: function(tag) {
        var newState = React.addons.update(this.state, {tagLabel: {$set: tag}});
        this.setState(newState);
    },
    //parse the string
    parseString: function(tag) {
        //if the tagLabel is type 1 tag, parse it by calling jQuery to our api
        if (this.state.tagLabel == TagName.Type1) { 
            $.getJSON($SCRIPT_ROOT + '/parsetag', {"tag": tag}, function(data) {
                var newState = React.addons.update(this.state, {table: {$set: data}});
                this.setState(newState);
            }.bind(this));
        }
        if (this.state.tagLabel == TagName.Type2) {
            var newState = React.addons.update(this.state, {tagText: {$set: tag}});
            this.setState(newState);
        }
        return false
    },
    //handle the click
    handleClick: function(clickButton) {
        var newState = React.addons.update(this.state, {navButton: {$set: clickButton}});
        
        this.setState(newState);
      
    },
    //render parse tag page
    renderParseTag: function() {
        return (
            <div>
            <NavBar didClick = {this.handleClick} page = {this.state.navButton} />
            <FirstPage state = {this.state} parsed = {this.parseString} toggle = {this.toggleTag} />
            </div>
            );
    },
    //render help page
    renderHelp: function() {
        return(
            <div>
            <NavBar didClick  = {this.handleClick} page = {this.state.navButton} />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1>Help</h1>
                    <p className = "lead">Paste the sample type1 tag or type2 tag into the form, choose an appropriate tag and press the button to parse it. 
                    <br/>A sample type1 tag looks like following: 
                    </p>
                    <p style = {divStyle}>
                    <i>2754|1573:1,2754|1573:1,3966|1573:1,2735|5079:32344|1670:12312|1573:41,2754|1573:1,2735|5079:12312|1670:12342|1573:32,123|1573:1,3252|4467:|1573:0,2735|5079:1234123|1670:12343|1573:37,2735|5079:123423|1670:1234324|1573:33,3940|1573:41,3839|1573:40,2735|1670:1234343|1573:38,2735|5079:5594287|1670:559423|1573:32,3966|1573:1|1573:1,123|1573:1|1573:1,2754|1573:1,3966|1573:4,2734|1573:5,3940|3872:1NQ3584%2C1NQN5%2C1NQN6%2C1NQ3L%Q359CM%2C1NQN|1573:6,2735|3872:1NQ352%2C352UX%2C1NQY%2C1NQ35W|5079:1234234|1670:23434343|1573:8,2735|5079:2343434|1670:123434|1573:10,2735|5079:1234234|1670:1234234|1573:11,2735|5079:1234324|1670:1234234|1573:12,2735|5079:1234234|1670:12342343|1573:13,2735|1670:1234234|1573:16,3839|1670:1234234|1573:17
                    </i>
                    </p>
                    <p className ="lead">A sample type2 tag looks like following</p>
                    <p style = {divStyle}>
                    <i>1827463%1293948302
                    </i>
                    </p>
                    </div>
                </div>
            </div>
            </div>
            );
    },
    //render about page
    renderAbout: function() {
        return(
            <div>
                <NavBar didClick = {this.handleClick} page = {this.state.navButton} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h1>About</h1>
                        <p className = "lead">This website is built with ♥ by Brabeeba Wang with Flask and React.js <br/>
                        This is the prototype website for future tracking system.<br/> 
                        It contains demo of both in-browser parsing and server parsing to confidentially decode. 
                         </p>
                        </div>
                    </div>
                </div>
            </div>
            );
    },
    //render based on the state of navButton
    render: function () {
        switch(this.state.navButton) {
            case NavBarButton.ParseTag:
               
                return this.renderParseTag();
                break;
            case NavBarButton.Help:
                return this.renderHelp();
                break;
            case NavBarButton.About:
                return this.renderAbout();
                break;
            default:
                return (<h1>YOU SHOULD NOT SEE THIS</h1>);
        }
    }

});

//stick the page container into html!! Woo Hoo!! A single page pure react web app is done!!
React.render(<PageContainer/>, document.getElementById('pageContainer'));