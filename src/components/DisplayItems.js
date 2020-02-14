import React, {Component} from 'react';

class DisplayItems extends React.Component {
    render() {
        return(
            <div className="container">
                <ul className="list-items"> 
                    {
                        this.props.items.map((item,key) => {
                            return(
                                <li className="item" key={key}>
                                    <span>{item.id}</span> - <span>{item.name}</span>
                                    <ul className="list-account">
                                        {item.accounts.map((account,no)=>{
                                            return(
                                                <li className="account" key={no}>{ account }</li> 
                                            )
                                        })}
                                    </ul>
                                </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default DisplayItems;