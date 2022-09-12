Refer https://angular.io/guide/setup-local to set up local environment and workspace.
Run "npm -v" in any command line tool to check the angular version
Clone/Download template from github or any website template and it supported for Angular.
Run "npm install" to download the required library for the template -> new folder node_modules existed.
Run "ng serve" to start the angular project and add the suffix -o if you want to automatic to open your website on the default browser.
Run "ng g c views/custom/sub-custom" to create a new component
	CREATE src/app/views/custom/sub-custom/sub-custom.component.html (25 bytes)
	CREATE src/app/views/custom/sub-custom/sub-custom.component.spec.ts (621 bytes)
	CREATE src/app/views/custom/sub-custom/sub-custom.component.ts (291 bytes)
	CREATE src/app/views/custom/sub-custom/sub-custom.component.scss (0 bytes)
	UPDATE src/app/app.module.ts (2365 bytes)
Run "ng g s views/custom/sub-custom-service" to create a new service
	CREATE src/app/views/custom/sub-custom-service.service.spec.ts (409 bytes)
	CREATE src/app/views/custom/sub-custom-service.service.ts (145 bytes)
Run "ng g module views/custom --routing" to create a new routing module
	CREATE src/app/views/custom/custom-routing.module.ts (249 bytes)
	CREATE src/app/views/custom/custom.module.ts (280 bytes)
Run "ng g m views/custom" to create a new model
	CREATE src/app/views/custom/custom.module.ts (192 bytes)
Run "ng g i views/custom/sub-custom-interface" to create a new interface
Run "ng g interceptor app" to create an interceptor
Run "ng g guard app" to create a guard


To delete anything you created above, please remove all file and revert the change in the app.module.ts

Some changed files in the project:
_nav.ts: 				define menu and url
app-routing.module.ts: 	routes to new component/ sub-routing
app.module.ts:			is root module, contains components, service providers and other codes file whose scope is defined by NgModule.
abc.interceptor.ts: 	once on some features of the interceptor is intercepting the HTTP requests from the application to add a JWT auth token to the HTTP Authorization header if 						the user is logged in and the request is to the Angular app's API URL. (need update the app.module.ts to add HTTP_INTERCEPTORS)
app.guard.ts:			provide 4 mechanisms below:
							CanActivate			:Determines whether a route should be activated.
							CanActivateChild	:Decides whether children routes are enabled
							CanDeactivate		:Decides whether a route should deactivate
							CanLoad				:Decides a module to be lazy loaded
						(Vietnamese: Cung cấp cơ chế phân quyền cho user, ví dụ trang sale thì không cần đăng nhập cũng vào được, trang admin thì phải là admin user mới vào đc.)
						(Go parallel to app.routing.module.ts)