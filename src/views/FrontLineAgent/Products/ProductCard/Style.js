export default (theme)=>({
  btn: {
    margin: theme.spacing(1, 0),
    display: 'block'
  },
  btnSmall: {
    margin: theme.spacing(1, 0),
    display: 'block',
    // fontSize:'.7rem',
    textTransform: 'lowercase'
  },
  card: {
    // display: 'flex',
    width: '90%',
    margin: theme.spacing(1.2, 3),
    padding: theme.spacing(1, 0),
    // flexFlow: 'column nowrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
    boxShadow: '0 0 50px 0 rgba(14, 42, 60, 0.15)',
    border: ` 1px solid #f4f4f4`,
    borderRadius: '.6rem',
    '& > *': {
      margin: theme.spacing(.6, 0),
    },
    '&:hover ': {
      boxShadow: ` 2px 2px 3px #ccc`,
    }
  },
  cardBody: {
    textAlign: 'center',
    margin: theme.spacing(1.2, 2),
    '& > *': {
      margin: theme.spacing(.6, 0),
    }


  },
  imgcard: {
    // textAlign: 'center',
    minHeight: '200px',
    minWidth: '80%',
    height: '200px',
    width: '80%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '.6rem',
    padding: theme.spacing(.3),
    margin: theme.spacing(1, 'auto'),
    '& img': {
      height: '200px',
      width: '100%',
      borderRadius: '.6rem',
      objectFit: 'center'
    }
  },
  displayPrice: {
    fontWeight: '800',
    fontSize: '1.3rem',
    color: theme.palette.secondary.main,
  },
  marketPrice: {
    textDecoration: 'line-through',
    fontWeight: '800',
    fontSize: '1.3rem',
    color: '#ddd',
  },
  price: {
    margin: theme.spacing(1.3, 0, 0, 0)
  },
  discount: {
    display: 'block',
    width: '20%',
    position: 'absolute',
    padding: theme.spacing(.8),
    margin: theme.spacing(6, 0, 0, 0),
    borderTopRightRadius: '.6rem',
    borderBottomRightRadius: '.6rem',
    left: '0',
    background: theme.palette.tetiary.main,
    color: '#fff'
  },
  available: {
    fontWeight: '600',
    fontSize: '.9rem',
  },
  btnIcon: {
    margin: theme.spacing(0, 0, -1, 0),
  }
})