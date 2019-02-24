import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import Recaptcha from 'react-recaptcha';

class Register extends Component{

    //component state
    constructor(){
      super();
      this.state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        recaptchaAuth: false,
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
      this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/');
      }
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    //componentWillReceiveProps(nextProps) {
      //test for errors prop
    //  if (nextProps.errors) {
    //    this.setState({ errors: nextProps.errors });
    //  }
    //}

     static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
          return { errors: nextProps.errors };
        }
        return null
     }
   
     static componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
          this.setState({ errors: this.props.errors })
        }
     }
  

    onChange(e){
      this.setState({[e.target.name]: e.target.value});
    }

    recaptchaLoaded(){
      console.log('captcha sucessfully loaded!');
    }

    verifyCallback(res){
      if(res){
        this.setState({recaptchaAuth : true});
      }
    }


    onSubmit(e){
      e.preventDefault();

      if(this.state.recaptchaAuth){
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        }

        //this.props is accessible due to react-redux connect and holds all connected actions, props are action and reducer(state) accessors basically...
        //all reducers which are connected within index.js (rootReducer) and have cases for this action type get invoked with this call
        this.props.registerUser(newUser,this.props.history);
        //this.props.history for navigation purpose within the action (authAction)
      }
      else{
        //TODO set err
        console.log("Recaptcha auth failed!");
      }
    }

    render(){
      const { errors } = this.state;
      //same as const {user} = this.const.auth;
      //const user = this.props.auth.user;

        return (
            <div className="register">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">
                      Create your ShoppingList account
                    </p>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          //always add form-control and form-control-lg classes but only conditionally is-valid class
                          className={classnames('form-control form-control-lg', {'is-invalid' : errors.name})}
                          placeholder="Name"
                          name="name"
                          //component state value link
                          value={this.state.name}
                          onChange={this.onChange}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className={classnames('form-control form-control-lg', {'is-invalid' : errors.email})}
                          placeholder="Email Address"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.email}</div>)}
                        <small className="form-text text-muted">
                          This site uses Gravatar so if you want a profile image, use
                          a Gravatar email
                        </small>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={classnames('form-control form-control-lg', {'is-invalid' : errors.password})}
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.password}</div>)}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={classnames('form-control form-control-lg', {'is-invalid' : errors.password2})}
                          placeholder="Confirm Password"
                          name="password2"
                          value={this.state.password2}
                          onChange={this.onChange}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.password2}</div>)}
                      </div>
                      <input type="submit" className={classnames('btn btn-info btn-block mt-4')}/>
                      <div className="mt-4">
                        <Recaptcha
                          sitekey="6Lcay0AUAAAAAOsv6FQlFexy08Be9mOQKZbPjj6W"
                          render="explicit"
                          onloadCallback={this.recaptchaLoaded}
                          verifyCallback={this.verifyCallback}
                        />
                      </div>
                      {errors.recaptcha && (<div className="invalid-feedback">You failed the humanity check</div>)}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};

//to access the redux state in this component we must map it
const mapStateToProps = (state) => ({
  //IMPORTANT! auth is called auth because the authReducer is called so within the rootReducer, so we can access the authReducers by doing so
  auth: state.auth,
  //access the reducer properties with: this.props.auth | authproperties in any other component to access auth state
  
  errors: state.errors
  //access the reducer properties with: this.props.errors | errorproperties in any other component to access errors state
});

//IMPORTANT! wrapping inside of withRouter enables to use redirecting outside of components for example within actions
export default connect(mapStateToProps, {registerUser})(withRouter(Register)); 