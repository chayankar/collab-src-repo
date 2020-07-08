import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/inventory',     title: 'Inventory',         icon: 'nc-basket',       class: '' },
    { path: '/feed',          title: 'News Feed',         icon: 'nc-paper',       class: '' },
    { path: '/icons',         title: 'Icons',             icon: 'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon: 'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    toggleSideMenu(){
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }
}
