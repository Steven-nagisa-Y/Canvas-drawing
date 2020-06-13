#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>
#define PI 3.141592
//struct
struct point
{
	double x;
	double y;
};
typedef struct point POINT;
//functions

POINT cis(double a)
{
	POINT c;
	c.x = cos(a);
	c.y = sin(a);
	return c;
}

POINT crmult(POINT a, double b)
{
	POINT c;
	c.x = a.x * b;
	c.y = a.y * b;
	return c;
}

POINT cmult(POINT a, POINT b)
{
	POINT c;
	c.x = a.x * b.x - a.y * b.y;
	c.y = a.x * b.y + a.y * b.x;
	return c;
}

POINT add(POINT a, POINT b)
{
	POINT c;
	c.x = a.x + b.x;
	c.y = a.y + b.y;
	return c;
}

double abbs(POINT a)
{
	return sqrt(a.x * a.x + a.y * a.y);
}

int getPoint(double a, int n)
{
	double a1 = n * a;
	int amin = (int)floor(a1);
	int amax = (int)ceil(a1);
	if (amin == amax)
		return amin;
	return amax;
}


int main() /**/
{
	int i = 0;
	int n = 10;
	//open file to read point
	FILE *fo;
	fo = fopen("point.txt", "r");
	if (!fo)
	{
		puts("Open file error!");
		return -1;
	};

	POINT *pp = (POINT *)malloc((10) * sizeof(POINT));
	for (i = 0; i < 10; i++)
	{
		fscanf(fo, "%lf", &(*(pp + i)).x);
		fscanf(fo, "%lf", &(*(pp + i)).y);
	};

	printf("Input the n of Cn:\n");
	scanf("%d", &n);
	POINT *Cn_p = (POINT *)malloc((2 * n + 1) * sizeof(POINT));
	Cn_p += n; //point to C0
	printf("\nCn is defined!\n");

	POINT c = {0, 0};
	for (i = -n; i <= n; i++)
	{
		double t;
		c.x = 0;
		c.y = 0;
		for (t = 0; t <= 1; t += 0.001) //delta
		{
			c = add(c, crmult(cmult(*(pp + getPoint(t, 10)), cis(-2 * i * t * PI)), 0.001));
		}
		(*(Cn_p + i)).x = c.x;
		(*(Cn_p + i)).y = c.y;
		printf("{\"x\":%.6f,\"y\":%.6f},\n", (*(Cn_p + i)).x, (*(Cn_p + i)).y);
	}
	puts("\nCn is ready!\n");
	FILE *fw;
	fw = fopen("Cn.json", "w+");
	if (!fw)
	{
		puts("Open file error!");
		return -1;
	};
	fputc('[', fw);
	fprintf(fw, "{\"x\":%.6f,\"y\":%.6f},\n", (*(Cn_p)).x, (*(Cn_p)).y); //C0
	for (i = 1; i <= n; i++)
	{
		fprintf(fw, "{\"x\":%.6f,\"y\":%.6f},\n", (*(Cn_p + i)).x, (*(Cn_p + i)).y); // C1,C-1
		fprintf(fw, "{\"x\":%.6f,\"y\":%.6f}", (*(Cn_p - i)).x, (*(Cn_p - i)).y);
		if (i != n) fprintf(fw, ",\n");
	}
	fputc(']', fw);

	free(pp);
	Cn_p -= n;
	free(Cn_p);
	fclose(fo);
	fclose(fw);

	return 0;
}
