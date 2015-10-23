angular.module('starter.factories', ['ngResource'])


.factory('Complain', function($resource) {
  return $resource(ROOT_URL+'/api/complains/:id');
})

.factory('Session', function($resource) {
  return $resource(ROOT_URL+'/api/sessions/:id');
})

.factory('User', function($resource) {
  return $resource(ROOT_URL+'/api/users/:id', null,
      {
          'update': { method:'PUT' },
          'login': { method: 'POST',url: ROOT_URL+"/api/users/login" },
          'complaints': { method: 'POST',url: ROOT_URL+"/api/users/:user_id/complaints" }
      });
})
