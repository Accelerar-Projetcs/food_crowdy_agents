import React, { useState, useEffect } from 'react';
import {
  CardHeader,
  Divider,
  CardActions,
  Grid,
  Card,
  makeStyles
} from '@material-ui/core/';
import BackDrop from '../../../components/BackDrop/BackDrop';
import Pagination from '../../../components/Pagination/Pagination';
import { allProductsStyles } from './styles/Styles';
import ProductCard from './ProductCard'
import { Product as EmptyList } from '../../../components/EmptyList/EmptyList';

const useStyles = makeStyles((theme) => allProductsStyles(theme));

export default function AllProducts({ data = [], loading }) {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = useStyles();
  const pageLimit = 6;

  useEffect(() => {



  }, [data,]);
  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <CardHeader title={`(${data.length}) Products`} />
      </div>
      <Divider />
      <Grid container spacing={1}>
        {loading && <BackDrop />}
        {data.length ? (
          data.slice(offset, offset + pageLimit).map((item) => (
            <Grid key={item._id} item lg={4} md={6} xl={8} xs={12}>
              <ProductCard item={item} />
            </Grid>
          ))
        ) : (
            <EmptyList title={'No item found'} />
          )}
      </Grid>
      <Divider />
      <CardActions>
        <div>
          {data && (
            <Pagination
              data={data.length}
              pageLimit={pageLimit}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </CardActions>
    </Card>
  );
}
