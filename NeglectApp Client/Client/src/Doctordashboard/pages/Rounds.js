import react from 'react'
import Page from '../components/Page';
import { Container, Stack, Typography,Box, Grid, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Link } from 'react-router-dom';

export default function Rounds() {
    return(
        <Page>
            <Container>    
            <Grid container spacing={5} alignItems="flex-end">
            <Grid
            item
              xs={12}
              sm={6}    /**/
              md={4}   /*for normal screen*/
            >
              <Card>
                <CardHeader
                  title= "Round One"
                  subheader= "Difficulty Level: Easy"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: '#F4F6F8',
                    paddingBottom: 2
                  }}
                />
                <CardContent>
                  <Box
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  <Typography  component="p"
                        align="center"
                        >
                   Scratch all the circles!
                  </Typography>
                </CardContent>
                <Box textAlign= "center">
                <Link to="/rehabilitator" state={{ round: 1 }}>
                  <Button variant='contained' sx={{marginBottom: '5%'}} > Start Round 1 </Button>
                </Link>
                </Box>

              </Card>
</Grid>




              <Grid
            item
              xs={12}
              sm={6}    /**/
              md={4}   /*for normal screen*/
            >
              <Card>
                <CardHeader
                  title= "Round Two"
                  subheader= "Difficulty Level: Medium"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: '#F4F6F8',
                    paddingBottom: 2
                  }}
                />
                <CardContent>
                  <Box
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  <Typography  component="p"
                        align="center"
                        >
                   Scratch all the circles, leaving all triangles!
                  </Typography>
                </CardContent>
                <Box textAlign= "center">
                  <Button variant='contained' sx={{marginBottom: '5%'}} disabled={true} >Start Round 2</Button>
                </Box>
              </Card>
            </Grid>





            <Grid
            item
              xs={12}
              sm={6}    /**/
              md={4}   /*for normal screen*/
            >
              <Card>
                <CardHeader
                  title= "Round Three"
                  subheader= "Difficulty Level: Hard"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: '#F4F6F8',
                    paddingBottom: 2
                  }}
                />
                <CardContent>
                  <Box
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  <Typography  component="p"
                        align="center"
                        >
                   Scratch all the circles, leaving all triangles & squares!
                  </Typography>
                </CardContent>
                <Box textAlign= "center">
                  <Button variant='contained' sx={{marginBottom: '5%'}} disabled={true}>Start Round 3</Button>
                </Box>
              </Card>
            </Grid>

</Grid>



        

        </Container>
    </Page>
    );
}