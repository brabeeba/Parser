(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

//This is the enum on toggling navBar
var NavBarButton = {
    ParseTag: 1,
    Help: 2,
    About: 3
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
var NavBar = React.createClass({
    displayName: "NavBar",

    //Spit you active or inactive for className based on the parents' state
    activeOrNot: function activeOrNot(vari) {
        if (vari == this.props.page) {
            return "active";
        } else {
            return "inactive";
        }
    },
    //handle click to its parents
    handleClick: function handleClick(clickButton) {

        this.props.didClick(clickButton);
        return false;
    },
    //normal bootstrap navBar
    render: function render() {
        return React.createElement(
            "nav",
            { className: "navbar navbar-default navbar-static-top" },
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "a",
                    { href: "#", className: "navbar-brand", onClick: this.handleClick.bind(null, NavBarButton.ParseTag) },
                    "TagParser"
                ),
                React.createElement(
                    "div",
                    { className: "collapse navbar-collapse" },
                    React.createElement(
                        "ul",
                        { className: "nav navbar-nav navbar-right" },
                        React.createElement(
                            "li",
                            { className: this.activeOrNot(NavBarButton.ParseTag) },
                            React.createElement(
                                "a",
                                { href: "#", onClick: this.handleClick.bind(null, NavBarButton.ParseTag) },
                                "ParseTag"
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: this.activeOrNot(NavBarButton.Help) },
                            React.createElement(
                                "a",
                                { href: "#", onClick: this.handleClick.bind(null, NavBarButton.Help) },
                                "Help"
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: this.activeOrNot(NavBarButton.About) },
                            React.createElement(
                                "a",
                                { href: "#", onClick: this.handleClick.bind(null, NavBarButton.About) },
                                "About"
                            )
                        )
                    )
                )
            )
        );
    }
});

//class to create the table
var ResultTable = React.createClass({
    displayName: "ResultTable",

    //table that renders type1 tag
    renderType1: function renderType1() {
        var table = this.props.table;
        var tableBody = "";
        if (table.table.hasOwnProperty("result")) {
            tableBody = table.table.result.map(function (row) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        row.Module
                    ),
                    React.createElement(
                        "th",
                        null,
                        row.Property
                    ),
                    React.createElement(
                        "th",
                        null,
                        row.Value
                    )
                );
            });
        }

        return React.createElement(
            "table",
            { className: "table" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    table.header.map(function (header) {
                        return React.createElement(
                            "th",
                            null,
                            " ",
                            header
                        );
                    })
                )
            ),
            React.createElement(
                "tbody",
                null,
                tableBody
            )
        );
    },
    //table to render type2 tag
    renderType2: function renderType2() {
        var string = this.props.tagText;
        var tableHead = React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Head"
                ),
                React.createElement(
                    "th",
                    null,
                    "Tail"
                )
            )
        );
        //for the type2 tag I parse the first 7 characters and the last 10 characters
        var tableBody = React.createElement(
            "tbody",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    " ",
                    string.substr(0, 7)
                ),
                React.createElement(
                    "th",
                    null,
                    " ",
                    string.substr(string.length - 10, 10)
                )
            )
        );
        return React.createElement(
            "table",
            { className: "table" },
            tableHead,
            tableBody
        );
    },
    //render the table based on the parents' state

    render: function render() {
        switch (this.props.tagLabel) {
            case TagName.Type1:
                return this.renderType1();
                break;
            case TagName.Type2:
                return this.renderType2();
                break;
            default:
                return React.createElement(
                    "h1",
                    null,
                    "YOU SHOULD NOT SEE THIS"
                );
        }
    }
});
//the form to take input from user
var TagForm = React.createClass({
    displayName: "TagForm",

    //get user input through ref
    parseString: function parseString() {
        var tag = this.refs.parseTag.getDOMNode().value;
        document.getElementById("parseTag").value = '';
        this.props.parsetag(tag);

        return false;
    },
    //toggle the tag
    toggleTag: function toggleTag(tag) {
        this.props.toggle(tag);
        return false;
    },
    //render the form
    render: function render() {
        //get the tag name
        var tag = "Type1 Tag";
        if (this.props.tagLabel == TagName.Type2) {
            tag = "Type2 Tag";
        }
        return React.createElement(
            "form",
            { className: "form-inline" },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "div",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                            tag,
                            React.createElement("span", { className: "caret" })
                        ),
                        React.createElement(
                            "ul",
                            { className: "dropdown-menu" },
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this.toggleTag.bind(null, TagName.Type1) },
                                    "Type1 Tag"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this.toggleTag.bind(null, TagName.Type2) },
                                    "Type2 Tag"
                                )
                            )
                        )
                    ),
                    React.createElement("input", { type: "text", ref: "parseTag", className: "form-control", id: "parseTag", placeholder: "enter the tag" })
                )
            ),
            React.createElement("input", { className: "btn btn-default", type: "button", value: "Parse", onClick: this.parseString })
        );
    }
});
//first page container
var FirstPage = React.createClass({
    displayName: "FirstPage",

    toggleTag: function toggleTag(tag) {
        this.props.toggle(tag);
    },
    parseString: function parseString(tag) {
        this.props.parsed(tag);
    },

    render: function render() {

        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement("div", { className: "col-md-4" }),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(TagForm, { parsetag: this.parseString, tagLabel: this.props.state.tagLabel, toggle: this.toggleTag })
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(ResultTable, { table: this.props.state, tagLabel: this.props.state.tagLabel, tagText: this.props.state.tagText })
                )
            )
        );
    }

});
//The page container including other pages
var PageContainer = React.createClass({
    displayName: "PageContainer",

    //set initial state
    getInitialState: function getInitialState() {
        return { navButton: NavBarButton.ParseTag, header: ["Module", "Property", "Value"], table: [], tagLabel: TagName.Type1, tagText: "" };
    },
    //toggle tag
    toggleTag: function toggleTag(tag) {
        var newState = React.addons.update(this.state, { tagLabel: { $set: tag } });
        this.setState(newState);
    },
    //parse the string
    parseString: function parseString(tag) {
        //if the tagLabel is type 1 tag, parse it by calling jQuery to our api
        if (this.state.tagLabel == TagName.Type1) {
            $.getJSON($SCRIPT_ROOT + '/parsetag', { "tag": tag }, (function (data) {
                var newState = React.addons.update(this.state, { table: { $set: data } });
                this.setState(newState);
            }).bind(this));
        }
        if (this.state.tagLabel == TagName.Type2) {
            var newState = React.addons.update(this.state, { tagText: { $set: tag } });
            this.setState(newState);
        }
        return false;
    },
    //handle the click
    handleClick: function handleClick(clickButton) {
        var newState = React.addons.update(this.state, { navButton: { $set: clickButton } });

        this.setState(newState);
    },
    //render parse tag page
    renderParseTag: function renderParseTag() {
        return React.createElement(
            "div",
            null,
            React.createElement(NavBar, { didClick: this.handleClick, page: this.state.navButton }),
            React.createElement(FirstPage, { state: this.state, parsed: this.parseString, toggle: this.toggleTag })
        );
    },
    //render help page
    renderHelp: function renderHelp() {
        return React.createElement(
            "div",
            null,
            React.createElement(NavBar, { didClick: this.handleClick, page: this.state.navButton }),
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement(
                            "h1",
                            null,
                            "Help"
                        ),
                        React.createElement(
                            "p",
                            { className: "lead" },
                            "Paste the sample type1 tag or type2 tag into the form, choose an appropriate tag and press the button to parse it.",
                            React.createElement("br", null),
                            "A sample type1 tag looks like following:"
                        ),
                        React.createElement(
                            "p",
                            { style: divStyle },
                            React.createElement(
                                "i",
                                null,
                                "2754|1573:1,2754|1573:1,3966|1573:1,2735|5079:32344|1670:12312|1573:41,2754|1573:1,2735|5079:12312|1670:12342|1573:32,123|1573:1,3252|4467:|1573:0,2735|5079:1234123|1670:12343|1573:37,2735|5079:123423|1670:1234324|1573:33,3940|1573:41,3839|1573:40,2735|1670:1234343|1573:38,2735|5079:5594287|1670:559423|1573:32,3966|1573:1|1573:1,123|1573:1|1573:1,2754|1573:1,3966|1573:4,2734|1573:5,3940|3872:1NQ3584%2C1NQN5%2C1NQN6%2C1NQ3L%Q359CM%2C1NQN|1573:6,2735|3872:1NQ352%2C352UX%2C1NQY%2C1NQ35W|5079:1234234|1670:23434343|1573:8,2735|5079:2343434|1670:123434|1573:10,2735|5079:1234234|1670:1234234|1573:11,2735|5079:1234324|1670:1234234|1573:12,2735|5079:1234234|1670:12342343|1573:13,2735|1670:1234234|1573:16,3839|1670:1234234|1573:17"
                            )
                        ),
                        React.createElement(
                            "p",
                            { className: "lead" },
                            "A sample type2 tag looks like following"
                        ),
                        React.createElement(
                            "p",
                            { style: divStyle },
                            React.createElement(
                                "i",
                                null,
                                "1827463%1293948302"
                            )
                        )
                    )
                )
            )
        );
    },
    //render about page
    renderAbout: function renderAbout() {
        return React.createElement(
            "div",
            null,
            React.createElement(NavBar, { didClick: this.handleClick, page: this.state.navButton }),
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement(
                            "h1",
                            null,
                            "About"
                        ),
                        React.createElement(
                            "p",
                            { className: "lead" },
                            "This website is built with ♥ by Brabeeba Wang with Flask and React.js ",
                            React.createElement("br", null),
                            "This is the prototype website for future tracking system.",
                            React.createElement("br", null),
                            "It contains demo of both in-browser parsing and server parsing to confidentially decode."
                        )
                    )
                )
            )
        );
    },
    //render based on the state of navButton
    render: function render() {
        switch (this.state.navButton) {
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
                return React.createElement(
                    "h1",
                    null,
                    "YOU SHOULD NOT SEE THIS"
                );
        }
    }

});

//stick the page container into html!! Woo Hoo!! A single page pure react web app is done!!
React.render(React.createElement(PageContainer, null), document.getElementById('pageContainer'));

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
