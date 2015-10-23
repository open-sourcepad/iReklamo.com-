angular.module('starter.factories', ['ngResource'])


.factory('Complain', function($resource) {
  return $resource('/api/complains/:id');
})

.factory('Session', function($resource) {
  return $resource('/api/sessions/:id');
})

.factory('User', function($resource) {
  return $resource('/api/users/:id', null,
      {
          'update': { method:'PUT' },
          'login': { method: 'POST',url: "/api/users/login" },
          'complaints': { method: 'POST',url: "/api/users/:user_id/complaints" }
      });
})
