// npm install mocha chai sinon node-fetch --save-dev
// chmod +r 13/test/user.test.js


import { expect } from "chai";
import fetch from 'node-fetch';
import sinon from 'sinon';
import { fetchUsers } from "../script.js";


global.fetch = fetch;

describe("получение Пользователей с сервера", function () {
  afterEach(() => {
    sinon.restore();
  });

  let fetchStub;
  it("сравнение с нашими  Пользователями", async function () {
    const mochaUser = [
		{
			"id": 1,
			"name": "Leanne Graham",
			"username": "Bret",
			"email": "Sincere@april.biz",
			"address": {
			  "street": "Kulas Light",
			  "suite": "Apt. 556",
			  "city": "Gwenborough",
			  "zipcode": "92998-3874",
			  "geo": {
				 "lat": "-37.3159",
				 "lng": "81.1496"
			  }
			},
			"phone": "1-770-736-8031 x56442",
			"website": "hildegard.org",
			"company": {
			  "name": "Romaguera-Crona",
			  "catchPhrase": "Multi-layered client-server neural-net",
			  "bs": "harness real-time e-markets"
			}
		 },
		 {
			"id": 2,
			"name": "Ervin Howell",
			"username": "Antonette",
			"email": "Shanna@melissa.tv",
			"address": {
			  "street": "Victor Plains",
			  "suite": "Suite 879",
			  "city": "Wisokyburgh",
			  "zipcode": "90566-7771",
			  "geo": {
				 "lat": "-43.9509",
				 "lng": "-34.4618"
			  }
			},
			"phone": "010-692-6593 x09125",
			"website": "anastasia.net",
			"company": {
			  "name": "Deckow-Crist",
			  "catchPhrase": "Proactive didactic contingency",
			  "bs": "synergize scalable supply-chains"
			}
		 },
    ]  

    fetchStub = sinon.stub(global, 'fetch').resolves({
      ok: true,
      json: async () => mochaUser
    })
  
    const users =  fetchUsers ();
  
    expect(fetchStub.calledOnce).to.be.true;

    expect(users).to.deep.equal(mochaUser);
  })

  it('В случае отсутствия доступа к серверу будет: "Ошибка"', async () => {
    try {
		fetchUsers ();
    } catch (error) {   
      expect(error.message).to.equal('Ошибка'); 
    }
  });
})