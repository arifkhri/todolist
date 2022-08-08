const request = (url: string, options: any) => {
  const baseUrl = "https://todo.api.devcode.gethired.id";
  return fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());

}

const fetcher = {
  post: (url: string, body: any) => {
    const options = {
      method: 'post',
      body: JSON.stringify(body),
    }

    return request(url, options);
  },
  delete: (url: string) => {
    const options = {
      method: 'delete',
    }

    return request(url, options);
  },
  patch: (url: string, body: any) => {
    const options = {
      method: 'patch',
      // mode: "no-cors",
      headers: {
        Accept: '*/*',
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      },
      body: JSON.stringify(body),
    }
    return request(url, options);
  },
  get: (url: string, qParam?: any) => {
    let urlQparam: any = url;
    
    if(qParam) {
      urlQparam = `${url}?`
      Object.keys(qParam).forEach(key => urlQparam += `${key}=${qParam[key]}`)
    }
    
    const options = {
      method: 'get',
    }
    return request(urlQparam, options);
  },
}

export default fetcher;
