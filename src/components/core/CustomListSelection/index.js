import { Component, createRef } from 'preact';
import { FormGroup, FormInput, ImageLoader } from '_components/core';
import { getTranslation, showFilter } from '_helpers';
import style from './style';

class CustomListSelection extends Component {
	ref = createRef();
	constructor(props) {
		super(props);
		this.state = {
			showChildren: false,
			children: [],
			parent: 'global',
		};
	}

	componentDidMount = () => {
		document.addEventListener('click', this.onClickOutside, true);
	};

	componentWillUnmount = () => {
		document.removeEventListener('click', this.onClickOutside, true);
	};

	onClickOutside = (e) => {
		if (this.ref.current && !this.ref.current.contains(e.target)) {
			this.onHideFilter();
		}
	};

	onClickParent = (e) => {
		const { data } = this.props;
		console.log(this.props.selected)
		let obj = data.reduce((o, i) => Object.assign(o, { [i.value]: i }), {});
		let selected = obj[e.target.value];
		if (selected && selected.children && selected.children.length) {
			this.setState({
				showChildren: true,
				children: selected.children,
				parent: e.target.value,
			});
		}
		let val = {
			parentVal: e.target.value,
			hasChildren: selected.children && selected.children.length ? true : false,
		};
		this.props.onClickParent(val);
	};

	onClickChild = (e) => {
		let val = {
			childVal: e.target.value,
			parentVal: this.state.parent,
		};
		this.setState({
			child: val.childVal,
		});
		this.props.onClickChild(val);
	};

	onHideChildren = () => {
		this.setState({
			showChildren: false,
		});
	};

	onHideFilter = () => {
		this.setState({
			showChildren: false,
		});
		showFilter(null);
	};

	renderChildren = (data) => {
		return (
			<div
				className={`${style.childrenWrap} ${
					this.state.showChildren && this.props.show && style.show
				}`}
			>
				<div className={style.header}>
					<p className={style.back} onClick={this.onHideChildren}>
						&lt; {getTranslation('BACK')}
					</p>
					<p className={style.title}>
						{getTranslation('FILTER')} - {this.state.parent}
					</p>
					{/* <p className={style.clear}>{getTranslation('CLEAR')}</p> */}
				</div>
				<FormGroup>
					{data &&
						data.map((item) => (
							<div className={style.inputContainer}>
								<FormInput
									type={this.props.isSubMultiselect ? 'checkbox' : 'radio'}
									label={item.text}
									onClick={this.onClickChild}
									value={item.value}
									id={item.value}
									checked={item.selected}
									name="filter"
									className={style.hideCheck}
								></FormInput>
								<ImageLoader
									src="assets/images/GOING-dark.png"
									style={{
										container: `${style.iconCheck} ${
											item.selected ? style.active : ''
										}`,
									}}
								/>
							</div>
						))}
				</FormGroup>
			</div>
		);
	};

	render = (props, { parent, children }) => {
		return (
			<div
				ref={this.ref}
				className={`${style.filterWrap} ${props.show && style.show}`}
			>
				<div className={style.header}>
					<p className={style.title}>{getTranslation('FILTER')}</p>
					{/* <p className={style.clear}>{getTranslation('CLEAR')}</p> */}
				</div>
				<FormGroup className={style.parentWrap} onBlur={this.onHideFilter}>
					{props.data &&
						props.data.map((item) => (
							<div className={style.inputContainer}>
								<FormInput
									type={props.isMultiselect ? 'checkbox' : 'radio'}
									label={item.label}
									onClick={this.onClickParent}
									value={item.value}
									id={item.value}
									checked={props.selected === item.value}
									name="filter"
									className={style.hideCheck}
								></FormInput>
								<ImageLoader
									src="assets/images/GOING-dark.png"
									style={{
										container: `${style.iconCheck} ${
											props.selected === item.value ? style.active : ''
										}`,
									}}
								/>
							</div>
						))}
				</FormGroup>
				{this.renderChildren(children)}
			</div>
		);
	};
}

export default CustomListSelection;
