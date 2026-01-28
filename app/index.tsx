import { Redirect } from 'expo-router';

export default function Index() {
  // Ensure root path redirects to the standalone Welcome page
  return <Redirect href="/welcome" />;
}
