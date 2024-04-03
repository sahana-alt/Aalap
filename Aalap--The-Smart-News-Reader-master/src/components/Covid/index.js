import React from 'react';

import { Cards, CountryPicker, Chart } from '../../components/index';
import { fetchData } from '../../covid';
import styles from '../../App.module.css';

class Covid extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container} style={{backgroundSize:'100%',backgroundImage: 'url("https://www.syniverse.com/blog/wp-content/uploads/2018/08/Grey_Routes_Threat-Banner.jpg")'}}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default Covid;