import { Component, createRef } from 'preact';
import { FormGroup, FormInput } from '_components/core';
import { getTranslation } from '_helpers';
import { updateStore } from '_unistore';
import style from './style';

class Filter extends Component {
  ref = createRef();
  constructor(props) {
    super(props);
    this.state = {
      showChildren: false,
      children: [],
      selected: ''
    }
  }

  componentDidMount = () => {
    document.addEventListener('click', this.onClickOutside, true);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  onClickOutside = (e) => {
    if (this.ref.current && !this.ref.current.contains(e.target)) {
      this.onHideFilter();
    }
  };

  onParentClick = (e) => {
    const { data } = this.props;
    let obj = data.reduce((o, i) => Object.assign(o, {[i.value]: i}), {})
    let selected = obj[e.target.value];
    if (selected && selected.children && selected.children.length) {
      this.setState({
        showChildren: true,
        children: selected.children,
        selected: selected.label
      });
    }
  }

  onHideChildren = () => {
    this.setState({
      showChildren: false
    });
  }

  onHideFilter =() => {
    this.setState({
      showChildren: false
    })
    updateStore({
      filterShow: null
    })
  }
  
  renderChildren = (data) => {
    return (
      <div className={`${style.childrenWrap} ${this.state.showChildren && style.show}`}>
      <div className={style.header}>
        <p className={style.back} onClick={this.onHideChildren}>&lt; {getTranslation('BACK')}</p>
        <p className={style.title}>{getTranslation('FILTER')} - {this.state.selected}</p>
        <p className={style.clear}>{getTranslation('CLEAR')}</p>
      </div>
        <FormGroup>
          {data &&
            data.map(item => (
              <FormInput
                type={this.props.isSubMultiselect ? 'checkbox' : 'radio'}
                label={item.text}
                onClick={this.props.onClickCallback}
                value={item.value}
                id={item.value}
                name="filter"
              ></FormInput>
            ))
          }
        </FormGroup>
      </div>
    );
  }

  render = (props, {children}) => {
    return (
      <div ref={this.ref} className={`${style.filterWrap} ${props.show && style.show}`}>
        <div className={style.header}>
          <p className={style.title}>{getTranslation('FILTER')}</p>
          <p className={style.clear}>{getTranslation('CLEAR')}</p>
        </div>
        <FormGroup className={style.parentWrap} onBlur={this.onHideFilter}>
          {props.data &&
            props.data.map(item => (
              <FormInput
                type={props.isMultiselect ? 'checkbox' : 'radio'}
                label={item.label}
                onClick={this.onParentClick}
                value={item.value}
                id={item.value}
                name="filter"
              ></FormInput>
            ))
          }
        </FormGroup>
        {this.renderChildren(children)}
      </div>
    );
  }
};

export default Filter;