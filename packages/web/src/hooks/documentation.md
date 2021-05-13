# Custom hooks documentation

We have created two custom hooks to use with ReactJs, now we are going to describe the utilization of each one:

## 🧾 UseForm 🧾

This custom hook is developed to be used with any form you have in your code.
This custom hook don't have support to the input typy file.

You need to have install Joi library to use the hook, and create a Joi validation Schema if you want to validate the inputs:

```
const validationSchema = {
  login: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      })
      .required(),
    password: Joi.string().min(6).max(20).required(),
  }).with('email', 'password'),
 }
  
```

To use it, you need to set the inital values of inputs in form in a object with the name of the inputs like key, and the initial value like value:

```
const { formValues, handleInputChange, resetForm, errors, isValid } = useForm(
  {
    email: '',
    password: '',
  },
);
  
```

You need to create a handleSubmit function to set in the onSumbit event in form.


```
  
async function handleSubmit(e) {
  e.preventDefault();

  if (isValid(validationSchema.login)) {
    //add the action you need to trigger
    resetForm();
  }
}
  
```

Last, you need to create your form:

```
return (
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      id="email"
      name="email"
      arial-label="Insert your email"
      className="form__input mb-2"
      value={email}
      onChange={handleInputChange}
      placeholder="Insert your email"
    />
    <span className="mb-2 p-2 block text-error">
      {errors.email ? errors.email : ' '}
    </span>
    <InputPassword
      className="form__input mb-0"
      id="password"
      name="password"
      arial-label="Insert your password"
      value={password}
      onChange={handleInputChange}
      placeholder="Insert your password"
    />
    <span className="mb-2 p-2 block text-error">
      {errors.password ? errors.password : ' '}
    </span>
    <button
      className="btn w-full button-secondary rounded-4 mt-4 mb-0"
      type="submit"
      disabled={isSigningUp}
    >
      Log in
    </button>
  </form>  
)             
  
```

## 📷 UseImgPreview 📷

This custom hook is used to preview the image before submitting the form.
This custom hook only have suppor for input type file.

To use it, you need to set the initial state the reference image id like a string and desectrusture the urlPreview and file from stateImg: 

```
const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'coverImage',
  );

const { urlPreview, file } = stateImg;
```

Then you need to create inside your form a component like the next one, include your own icons in cancel and edit icon:

```
return (
    <div>
      <button
        type="button"
        onClick={handleImage}
      >
        <span
          className={
            urlPreview ? 'cancel icon' : 'edit icon'
          }
        />
      </button>
      <img
        src={urlPreview || defaultImg}
        alt="profile"
      />
      <input
        type="file"
        name={refId}
        id={refId}
        className="hidden"
        onChange={handleImageChange}
        multiple={false}
      />
    </div>
  );
```


## With ❤ Musikverein Team

- [Jose Serralvo](https://github.com/joserra-15)
- [Ramón Soler](https://github.com/rshernan)
- [Raúl Cátedra](https://github.com/RaulCatedra3003)
- [Verónica Velázquez](https://github.com/vvelazquezc)
