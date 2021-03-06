import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/User';
import { UserService } from 'app/services/user.service';
import { TokenService } from 'app/services/token.service';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    isVisible: boolean;
    iconClass: string;
    icon: string;
    class: string;
}

export let ROUTES: RouteInfo[] = [];

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	menuItems: any[];

	user: User = new User();
	isUserConnected: boolean = false;
	
	constructor(
		private _userService: UserService
	) { }

	ngOnInit() {
		// Subscription to userEventEmitter
		this._userService.userEventEmitter.subscribe((user) => {
			this.user = user;

			// subscribe to the isUserConnected
			this._userService.authStatus$.subscribe(
				(status) => {
					this.isUserConnected = status;

					ROUTES = [
						{ path: '/dashboard',	title: 'Dashboard',		isVisible: this.isUserConnected,		iconClass: 'material-icons',	icon: 'dashboard',	class: '' },
						{ path: '/medicines',	title: 'Medicines',		isVisible: this.isUserConnected,		iconClass: 'fas fa-capsules',	icon: '',			class: '' },
						{ path: '/users',		title: 'Employees',		isVisible: this.isUserConnected && this.user.type == 'admin',	iconClass: 'material-icons',	icon: 'people_alt',	class: '' },
						{ path: '/providers',	title: 'Providers',		isVisible: this.isUserConnected && this.user.type == 'admin',	iconClass: 'fas fa-handshake',	icon: '',			class: '' },
						{ path: '/profile',		title: 'My Profile',	isVisible: this.isUserConnected,		iconClass: 'material-icons',	icon: 'person',		class: '' },
						{ path: '/login',		title: 'Login',			isVisible: !this.isUserConnected,		iconClass: 'material-icons',	icon: 'person',		class: '' },
					];
					
					this.menuItems = ROUTES.filter(menuItem => menuItem);
				}
			);

		});
	}

	
	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	};
}
