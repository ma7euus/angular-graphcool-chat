import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private apiURL = 'https://api.graph.cool/simple/v1/cjvrdvhp52xr80139ur1w05ya';

    constructor(
        private http: HttpClient
    ) {
      this.createUser();
      this.allUsers();
    }

    allUsers(): void {
        const body = {
            query: `query {
                allUsers {
                    id
                    name
                    email
                }
            }`
        };
        this.http.post(this.apiURL, body)
        .subscribe(res => console.log('Query:', res));
    }

    createUser(): void {
      const body = {
        query: `mutation CreateNewUser($name: String!, $email: String!, $password: String!) {
          createUser(name: $name, email: $email, password: $password) {
            name
            email
            password
          }
        }`,
        variables: {
          name: 'Alana Angst',
          email: 'alaninha@hotmail.com',
          password: '123123123'
        }
      };
      this.http.post(this.apiURL, body)
      .subscribe(res => console.log('Mutation:', res));
    }
}
