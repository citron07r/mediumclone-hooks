export const BackendErrorMessages = ({errors}) => {
  console.log('backendErrors', errors)
  const errorMessages = Object.keys(errors).map((name) => {
    const messages = errors[name].join(' ')
    return `${name}: ${messages}`
  })

  return (
    <ul className="error-messages">
      {errorMessages.map((errMessage, idx) => (
        <li key={`${errMessage}-${idx}`}>{errMessage}</li>
      ))}
    </ul>
  )

  // return (
  //   <ul className="error-messages">
  //     {Object.entries(errors).map(([field, msgs]) =>
  //       [].concat(msgs).map((m, i) => (
  //         <li key={`${field}-${i}`}>
  //           {field}: {m}
  //         </li>
  //       )),
  //     )}
  //   </ul>
  // )
}
