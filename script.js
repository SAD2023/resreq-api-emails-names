// the button that says 'Get Emails'
const dataButton = document.getElementById('button');

// the button that says 'Get Names'
const dataSecondButton = document.getElementById('button2');


/** Sends a request of type [type] to the server in [url] and then returns 
 * the corresponding promise.
 */
const send = (type, url) => {
  const promise = new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.open(type, url);

    xhr.responseType = 'json'
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject("Something went wrong")
    };

    xhr.send();
  });

  return promise;
}

/**Sends a GET request to the reqres server, receives and processes the data to
 * find the list of emails, and finally displays the list in the html page above 
 * the button.
 */
const getEmails = () => {
  send('GET', 'https://reqres.in/api/users?page=2').then(responseData => {

    var element = document.getElementById("data");
    var string_version = JSON.stringify(responseData.data)
    var clipped_string = string_version.substring(1, string_version.length - 1)
    var list_of_individuals = clipped_string.split("},")

    var obj_list = []

    for (var i = 0; i < list_of_individuals.length; i++) {
      list_of_individuals[i] = list_of_individuals[i].substring(1)

      if (i === list_of_individuals.length - 1) {
        list_of_individuals[i] = list_of_individuals[i]
          .substring(0, list_of_individuals[i].length - 1)
      }

      obj_list.push(JSON.parse("{ " + list_of_individuals[i] + " }"))
    }

    var list_of_emails = []

    for (var i = 0; i < obj_list.length; i++) {
      list_of_emails.push(" " + obj_list[i].email)
    }

    element.innerHTML = list_of_emails
  })


};

const getNames = () => {
  send('GET', 'https://reqres.in/api/users?page=2').then(responseData => {

    var element = document.getElementById("data2");
    var string_version = JSON.stringify(responseData.data)
    var clipped_string = string_version.substring(1, string_version.length - 1)
    var list_of_individuals = clipped_string.split("},")

    var obj_list = []

    for (var i = 0; i < list_of_individuals.length; i++) {
      list_of_individuals[i] = list_of_individuals[i].substring(1)

      if (i === list_of_individuals.length - 1) {
        list_of_individuals[i] = list_of_individuals[i]
          .substring(0, list_of_individuals[i].length - 1)
      }

      obj_list.push(JSON.parse("{ " + list_of_individuals[i] + " }"))
    }

    var list_of_names = []

    for (var i = 0; i < obj_list.length; i++) {
      list_of_names.push(" " + obj_list[i].first_name + " " + obj_list[i].last_name)
    }

    element.innerHTML = list_of_names
  })

};

// Adds event listener to the 'Get Emails' button
dataButton.addEventListener('click', getEmails);


// Adds event listener to the 'Get Names' button
dataSecondButton.addEventListener('click', getNames);
