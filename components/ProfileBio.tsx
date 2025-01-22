import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProfileBioProps {
  bio: string;
  isPremium: boolean;
}

export function ProfileBio({ bio, isPremium }: ProfileBioProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{bio}</p>
        {!isPremium && (
          <div className="mt-4">
            <Link href="/pricing" passHref>
              <Button className="w-full bg-[#00c2cb] hover:bg-[#00a7af] text-white">
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

