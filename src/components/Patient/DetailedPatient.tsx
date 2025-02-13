import { Entry, Patient } from '../../types';
import { Gender } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import SvgIcon from '@mui/material/SvgIcon';
import { Diagnose } from '../../types';
import Hospital from './Entries/HospitalEntry';
import OccupationalHealthcareEntry from './Entries/OccupationalHealthcareEntry';
import HealthEntry from './Entries/HealthEntry';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry />;
    case 'HealthCheck':
      return <HealthEntry />;
    default:
      return assertNever(entry);
  }
};

const DetailedPatient = ({
  patient,
  diagnoses,
}: {
  patient: Patient | null | undefined;
  diagnoses: Diagnose[];
}) => {
  const findDiagnose = (code: string): string => {
    const found = diagnoses.find((d) => d.code === code);
    return found ? found.name : 'Diagnosis Not Found';
  };

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

        <Typography variant="h4" component="h2" style={{ marginTop: '0.5em' }}>
          Entries
        </Typography>

        {patient.entries.map((entry) => (
          <div>
            {/*  <li key={entry.id}>
              {entry.date} {entry.description}
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {findDiagnose(code)}{' '}
                    </li>
                  ))}
              </ul>
            </li>*/}

            <EntryDetails entry={entry} />
          </div>
        ))}
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
