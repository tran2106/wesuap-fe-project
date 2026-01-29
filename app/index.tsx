import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to loading page to show match finding animation
  return <Redirect href="/loading" />;
}
