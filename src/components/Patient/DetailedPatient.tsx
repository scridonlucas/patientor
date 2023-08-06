import { Patient } from '../../types';
import { Gender } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import SvgIcon from '@mui/material/SvgIcon';

const GenderIcon = ({ gender }: { gender: Gender }) => {
  if (gender === 'male') {
    return (
      <>
        <SvgIcon fontSize="large">
          <MaleIcon />
        </SvgIcon>
      </>
    );
  } else if (gender === 'female') {
    return (
      <>
        <SvgIcon fontSize="large">
          <FemaleIcon />
        </SvgIcon>
      </>
    );
  } else
    return (
      <>
        <SvgIcon fontSize="large">
          <TransgenderIcon />
        </SvgIcon>
      </>
    );
};

const DetailedPatient = ({
  patient,
}: {
  patient: Patient | null | undefined;
}) => {
  if (patient) {
    return (
      <div>
        <Typography variant="h4" component="h2" style={{ marginTop: '0.5em' }}>
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          style={{ marginTop: '0.5em' }}
        >
          SSN: {patient.ssn}
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          style={{ marginTop: '0.5em' }}
        >
          Job: {patient.occupation}
        </Typography>
        ;
      </div>
    );
  } else
    return (
      <div>
        <Typography variant="h4" component="h2" style={{ marginTop: '0.5em' }}>
          No patient found!
        </Typography>
      </div>
    );
};

export default DetailedPatient;
