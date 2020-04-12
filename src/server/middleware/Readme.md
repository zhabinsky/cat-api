## Structure

It is convenient to organise all the enpoints of our application under the name "middleware".
Every module in this directory exports an array of middlewares:

```
	export default [(req, res, next) => {...}, ..., ...]
```

This layout allows for easy-to-track re-combination of middlewares.
