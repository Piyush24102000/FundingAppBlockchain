// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract funder{
    uint public numOfFunders; //Total funders
    mapping(uint => address) private funders;  //The address of each Number(funder)
    receive() external payable{} //To receive ether into the contract

function transfer() external payable{
    funders[numOfFunders] = msg.sender; // Inital member will be msg.sender who will initiate the contract

}
function withdraw(uint withdrawamount)  external{
     require(withdrawamount <= 2000000000000000000,"cannot withdraw more than amount"); // // wihtdrawal should be less than 2^18
     payable(msg.sender).transfer(withdrawamount); // send the money back to the msg.sender 
}  

}