import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function ChatTable({
  employeeData,
}: {
  employeeData: Record<string, any>[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Овог нэр</TableHead>
          <TableHead>Ажиллах ёстой цаг</TableHead>
          <TableHead>Ажилласан цаг</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeeData.map((employee) => (
          <TableRow key={employee.name}>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.requiredWorkHour}</TableCell>
            <TableCell>{employee.registeredHour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
