///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
/**
 * Created by pratishshr on 5/14/16.
 */

import {Component, OnInit} from '@angular/core';

//Services
import {UserService} from '../../services/instagram/UserService';
import {User} from "../../models/UserModel";
import {JSONP_PROVIDERS}  from '@angular/http';

@Component({
    selector: 'log-in',
    template: require('../../views/login/login.html'),
    providers: [JSONP_PROVIDERS]
})
export class LoginComponent implements OnInit {
    user:User;
    errorMessage:string;

    constructor(private userService:UserService) {

    }

    ngOnInit() {
        this.user = new User();
        if (window.localStorage.getItem('ducky_access_token')) {
            this.getUserInfo();
        }
    }

    getUserInfo() {
        this.userService.getUserInfo()
            .subscribe(
                (user) => {
                    this.user = user;
                    this.user.fullName = user['full_name'];
                    this.user.userName = user['username'];
                    this.user.bio = user['bio'];
                    this.user.profilePicture = user['profile_picture'];
                    this.user.website = user['website'];
                },
                (error) => {
                    this.errorMessage = <any>error
                }
            );
    }


}