const translations = {
  "The fields user, movie must make a unique set.": "You have already written a review for this movie."
}

export default (received_errors) => {
  const server_errors = received_errors.response.data
  let errors = []

  for (const error in server_errors) {
    if (server_errors[error].constructor === Array) {
      if (error !== 'non_field_errors') {
        errors.push(error + ":");
      }
      for (const s_er in server_errors[error]){
        if (server_errors[error][s_er] in translations) {
          errors.push(translations[server_errors[error][s_er]]);
        }
        else {
          errors.push(server_errors[error][s_er]);
        }
      }
    }
    else {
      errors.push(server_errors[error]);
    }
  }
  return errors
};
