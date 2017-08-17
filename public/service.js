import chrome from 'ui/chrome';

export function DatagenProvider($http, $q, Private) {
  const apiPrefix = chrome.addBasePath('/api/kibana/datagen');

  this.generate = (dataplan) => {
    return $http.post(`${apiPrefix}/generate`, dataplan)
    .catch(err => {
      return $q.reject(new Error('Error generating data'));
    });
  };

  this.save = (dataplan, dataplanId) => {
    return $http.post(`${apiPrefix}/save/${dataplanId}`, dataplan)
    .catch(err => {
      return $q.reject(new Error('Error saving datplan'));
    });
  };

  this.load = (dataplanId) => {
    return $http.get(`${apiPrefix}/load/${dataplanId}`)
    .then((response) => {
      const dataplan = response.data;
      dataplan.dataplanId = dataplanId;
      return dataplan;
    })
    .catch(err => {
      return $q.reject(new Error('Error loading dataplan'));
    });
  };

  this.init = () => {
    return $http.post(`${apiPrefix}/init`)
    .then(() => {
      return true;
    })
    .catch(err => {
      return $q.reject(new Error('Error initializing'));
    });
  };

}
